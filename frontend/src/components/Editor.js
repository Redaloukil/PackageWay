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
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      errors : {}
    }
    
    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeContent = updateFieldEvent('content');
      this.changeContentType = updateFieldEvent('contentType');
      this.changeFrom = updateFieldEvent('from');
      this.changeTo = updateFieldEvent('to')
      
      this.validate = () => {
        var errors = {};
        const content = this.props.content;
        const contentType = this.props.contentType;
        const from = this.props.from;
        const fromWilaya = this.props.fromWilaya;
        if( content.length === 0 ) errors.content = "Please descripbe the content of your package";
        if( contentType.length === 0 ) errors.contentType = "Please sepcify the type of your package";
        if( from.length === 0 ) errors.from = "Please describe the address of your package";
        if( fromWilaya.length === 0 ) errors.fromWilaya = "Please specify the wilaya of your package";
        this.setState({errors : errors})
      } 
      
      
      this.submitForm = ev => {
        ev.preventDefault();
        //validate package information
        if (Object.keys(this.state.errors)){
          agent.Packages.create(
            this.props.content , "0",this.props.from , "0"
          );
          this.props.onSubmit();
        }
        
      
    };
    
  }
  
  componentWillMount() {
    if (this.props.match.params.id) {
      return this.props.onLoad(agent.Parcels.byId(this.props.match.params.id));
    }
    this.props.onLoad(null);
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
        <div className="container">
            <div className="row">
            <div className="col-md-12">
              <h2 className="h3 editor-title">Package details Form</h2>
              <p>Please provide all details about the package you want to submit , specify the right details to help our delivery be more fast</p>
              <hr/>
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <label for="contentDescription" className="form-label">Package Content</label>
                    <small id="contentDescriptionHelp" class="form-text text-muted">Provide details about the content of the parcel.</small>  
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Describe package content(food , clothes..)"
                      value={this.props.content}
                      onChange={this.changeContent} />
                      
                  </fieldset>
                  { this.state.errors.content ? <ErrorField text={this.state.errors.content}/> : null}
                  <fieldset className="form-group">
                  <div class="form-group">
                  <label for="wilayaSelection">Content Type</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={this.changeFormWilaya}>
                    <option value="0">Food</option>
                    <option value="1">Clothes</option>
                    <option value="2">Others</option>
                    
                    </select>
                    </div>
                 </fieldset>
                  
                 <fieldset className="form-group">
                  <div class="form-group">
                  <label for="wilayaSelection">Wilaya</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={this.changeFormWilaya}>
                    <option value="0">Oran</option>
                    <option value="1">Mostaganem</option>
                    <option value="2">Telemcen</option>
                    
                    </select>
                    </div>
                 </fieldset>
                 <fieldset className="form-group">
                  <label for="exampleInputEmail1" className="form-label">From Address</label>
                  <small id="addressHelp" class="form-text text-muted">Well never share your email with anyone else.</small>
                    <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Please Enter Package Location Address"
                    value={this.props.from}
                    onChange={this.changeFrom} />
                  </fieldset>
                  { this.state.errors.from ? <ErrorField text={this.props.from}/> : null}
                  
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
