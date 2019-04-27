import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import Header from './Header';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
     
      firstName:'',
      lastName:'',
    };

    
    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, {[field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      
      this.props.onSubmitForm(
        { 
          firstName : this.state.firstName, 
          lastName : this.state.lastName,
        }
      );
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        firstName : this.props.currentUser.firstName,
        lastName : this.props.currentUser.lastName,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        firstName : nextProps.currentUser.firstName,
        lastName : nextProps.currentUser.lastName,
      }));
    }
  }
  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.updateState('firstName')} />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.updateState('lastName')} />
          </fieldset>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => 
      dispatch({ type: LOGOUT }),
  onSubmitForm: (firstName , lastName) =>
      dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save( firstName , lastName )}),
  onUnload: () => 
      dispatch({type: SETTINGS_PAGE_UNLOADED}),
});

class Settings extends React.Component {
  render() {
    return (
      <div className="wrapper settings-page">
      <Header appName={this.props.appName} currentUser={this.props.currentUser} />

        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings - Profile Details</h1>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onSubmit}>
                Update Profile Details
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
