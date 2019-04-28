import ErrorField from './ErrorField';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import Header from './Header';
import '../styles/editor.css';
import {
  EDITOR_PAGE_LOADED,
  PARCEL_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
import MapGL from '@urbica/react-map-gl';

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
      viewport: {
        latitude: 37.78,
        longitude: -122.41,
        zoom: 11
      },
      errors : {
        content : "" ,
        content_type:"", 
        latitude : "" , 
        longitude : "" , 
        from : "" , 
        to : "",
      }
    }

    

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeContent = updateFieldEvent('content');
      this.changeContentType = updateFieldEvent('contentType');
      this.changeLongitude = () => {
        updateFieldEvent('longitude');
      } 
      this.changeLatitude = () => {
        
        updateFieldEvent('latitude')
      };
      this.changeFrom = updateFieldEvent('from');
      this.changeTo = updateFieldEvent('to')
      
      this.getCurrentGeolocation = () => {
        navigator.geolocation.getCurrentPosition( ev => {
          this.setState({map : {latitude : ev.coords.latitude , longitude : ev.coords.longitude}})
          this.props.onUpdateField('latitude', ev.coords.latitude)
          this.props.onUpdateField('longitude', ev.coords.longitude)
        })
      }
      this.mapKey = "pk.eyJ1IjoicmVkYWEiLCJhIjoiY2p0cHIzaW5wMDdpejQzbTI2NGpnM215ciJ9.7BluMTtZtz62qn_SREi8ig";
      
      this.submitForm = ev => {
        //verify parcel informations 
        ev.preventDefault();
        
      agent.Packages.create(
      //   this.props.content,
      //   '0',
      //   "Oran"
      // 
      );
      this.props.onSubmit();
    };
    
  }
  
  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Parcels.byId(this.props.match.params.id));
    }
    // mapboxgl.accessToken = this.mapKey;
    this.props.onLoad(null);
  }

  componentDidMount(){
    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   zoom: 9 ,
    //   center: [this.state.map.latitude , this.state.map.longitude]
    // });
  }
  
  componentWillReceiveProps(nextProps){
    this.forceUpdate();
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="wrapper editor-page">
      
        <div className="container-fluid page">
            <div id="map-container">
            
            <MapGL
                style={{ width: '100%', height: '400px' }}
                mapStyle= 'mapbox://styles/mapbox/streets-v11'
                accessToken={this.mapKey}
                latitude={this.state.viewport.latitude}
                longitude={this.state.viewport.longitude}
                zoom={this.state.viewport.zoom}
                onViewportChange={viewport => this.setState({ viewport })}
              />;
            </div>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-md-12">
              <h2 className="h3">Package details Form</h2>
              <p>Please provide all details about the package you want to submit</p>
              <hr/>
              <form>
                <fieldset>
                  <fieldset className="form-group">
                  <label for="exampleInputEmail1"><strong>Package Content</strong></label>
                    <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>  
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Describe package content(food , clothes..)"
                      value={this.props.content}
                      onChange={this.changeContent} />
                      
                  </fieldset>
                  { this.state.errors.content ? <ErrorField text={this.state.errors.content}/> : null}
                  <fieldset>
                    <label for="exampleInputEmail1"><strong>Content Type</strong></label>
                    <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                        <label class="form-check-label" for="exampleRadios1">
                          Food
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                        <label class="form-check-label" for="exampleRadios2">
                          Clothes
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3"/>
                        <label class="form-check-label" for="exampleRadios3">
                          Other
                        </label>
                    </div>
                  </fieldset>
                  <fieldset className="form-group">
                    <label for="exampleInputEmail1"><strong>Package Geolocation</strong></label>
                    <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>
                    <div className="row">
                      <div className="col-sm-6">
                      <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Set the longitude"
                      value={this.state.viewport.latitude}
                      onChange={this.changeLatitude} />
                      { this.state.errors.latitude ? <ErrorField text={this.state.errors.latitude}/> : null}
                      </div>
                      <div className="col-sm-6">
                      <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Set the longitude"
                      value={this.state.viewport.longitude}
                      onChange={this.changeLongitude} />
                    
                    { this.state.errors.longitude ? <ErrorField text={this.state.errors.longitude}/> : null}
                      </div>
                    </div>
                      
                  </fieldset>
                  
                 
                    
                  <fieldset className="form-group">
                  <label for="exampleInputEmail1"><strong>From Address</strong></label>
                  <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>
                    <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Please Enter Package Location Address"
                    value={this.props.from}
                    onChange={this.changeFrom} />
                  </fieldset>
                  { this.state.errors.from ? <ErrorField text={this.props.from}/> : null}
                  <fieldset className="form-group">
                  <label for="exampleInputEmail1"><strong>Destination address</strong></label>
                  <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>
                    <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Please Enter Package Destination Address"
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
