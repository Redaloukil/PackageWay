import ErrorField from './ErrorField';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  EDITOR_PAGE_LOADED,
  PARCEL_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';  

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: PARCEL_SUBMITTED, payload }),
  onUnload: () =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      errors : {
        title : "",
        body : "" , 
        latitude : "" , 
        longitude : "" , 
        from : "" , 
        to : "",
      }
    }

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeTitle = updateFieldEvent('title');
      this.changeBody = updateFieldEvent('body');
      this.changeLongitude = updateFieldEvent('longitude');
      this.changeLargitude = updateFieldEvent('latitude');
      this.changeFrom = updateFieldEvent('from');
      this.changeTo = updateFieldEvent('to')

      this.mapKey = "pk.eyJ1IjoicmVkYWEiLCJhIjoiY2p0cHIzaW5wMDdpejQzbTI2NGpnM215ciJ9.7BluMTtZtz62qn_SREi8ig";
      this.getCurrentGeolocation = () => {
        navigator.geolocation.getCurrentPosition( ev => {
          this.props.onUpdateField('latitude', ev.coords.latitude)
          this.props.onUpdateField('longitude', ev.coords.longitude)
        })
      }

      this.displayMap = () => {
          this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'
          });
          
      }
      this.submitForm = ev => {
        //verify parcel informations 
        ev.preventDefault();
        const article = {
          title: this.props.title,
          body: this.props.body,
          latitude:this.props.latitude,
          longitude:this.props.longitude,
          from:this.props.from,
          to:this.props.to,
        };

      agent.Articles.create(article);

      this.props.onSubmit();
      };
  }
  
  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Parcels.byId(this.props.match.params.id));
    }
    mapboxgl.accessToken = this.mapKey;
    this.props.onLoad(null);
  }

  componentDidMount(){
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
      });
  }
  
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <div id="map">
                
              </div>
            </div>
            <div className="col-md-8 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>
                  { this.state.errors.title ? <ErrorField text={this.state.errors.title}/> : null}
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>
                  { this.state.errors.body ? <ErrorField text={this.state.errors.body}/> : null}

                  <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="Set the latitude"
                    value={this.props.latitude}
                    onChange={this.changeLatitude} />
                  </fieldset>
                  { this.state.errors.latitude ? <ErrorField text={this.state.errors.latitude}/> : null}
                  
                  <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="Set the longitude"
                    value={this.props.longitude}
                    onChange={this.changeLongitude} />
                  </fieldset>
                  { this.state.errors.longitude ? <ErrorField text={this.state.errors.longitude}/> : null}
                  <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="Location Address"
                    value={this.props.from}
                    onChange={this.changeFrom} />
                  </fieldset>
                  { this.state.errors.from ? <ErrorField text={this.props.from}/> : null}
                  <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="Destination Address"
                    value={this.props.to}
                    onChange={this.changeTo} />
                  </fieldset>
                  { this.state.errors.to ? <ErrorField text={this.state.errors.to}/> : null}

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.getCurrentGeolocation}>
                    Get current location
                  </button>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
