import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  EDITOR_PAGE_LOADED,
  PARCEL_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

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

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeTitle = updateFieldEvent('title');
      this.changeBody = updateFieldEvent('body');
      this.changeLongitude = updateFieldEvent('longitude');
      this.changeLargitude = updateFieldEvent('largitude');

      
      this.getCurrentGeolocation = () => {
        navigator.geolocation.getCurrentPosition((ev)=> {
          console.log(ev)
        })
      }
      this.submitForm = ev => {
        ev.preventDefault();
        const article = {
          title: this.props.title,
          body: this.props.body,
          largitude:this.props.largitude,
          longitude:this.props.longitude,
        };

      agent.Articles.create(article);

      this.props.onSubmit();
      };
  }

  

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
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
              <div id="map" class="map"></div>
            </div>
            <div className="col-md-8 col-xs-12">
              <ListErrors errors={this.props.errors}></ListErrors>
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
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="Set the largitude"
                    value={this.props.description}
                    onChange={this.changeDescription} />
                  </fieldset>
                  
                  <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="Set the longitude"
                    value={this.props.description}
                    onChange={this.changeDescription} />
                  </fieldset>

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
