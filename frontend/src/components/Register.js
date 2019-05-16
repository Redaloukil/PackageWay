
import React from 'react';
import { Link } from 'react-router-dom';

import agent from '../agent';
import { connect } from 'react-redux';
import { UPDATE_FIELD_AUTH , REGISTER , REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';
import Header from './Header';

const mapStateToProps = state => ({ 
  ...state.auth,
  appName: state.common.appName,
  token: state.common.token 
});

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangeFirstName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'firstName', value }),
  onChangeLastName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'lastName', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeConfirmPassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'cpassword', value }),
  onSubmit: (username , firstName , lastName ,password) => {
      const payload = agent.Auth.register(username, firstName , lastName , password);
      dispatch({ type: REGISTER, payload })},
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      errors:{}
    }
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
    this.changeLastName = ev => this.props.onChangeLastName(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeCPassword = ev => this.props.onChangeCPassword(ev.target.value);
    this.submitForm = (username, firstName , lastName ,  password ) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username ,firstName , lastName ,password);
    }
    this.validate = data => {
      const username = this.props.username;
      const firstName = this.props.firstName;
      const lastName = this.props.lastName;
      const password = this.props.password;
      const cpassword = this.props.cpassword;
      const errors = {};
      if (username.length <= 8 ) errors.username = "Invalid username";
      if (firstName.length = 0 ) errors.firstName = "Invalid first name";
      if (lastName.length = 0) errors.lastName = "Invalid last name";
      if ((password.length == cpassword.length) && password.length >= 8) errors.inValidPassword = "Invalid password"
        
      
      return errors;
    }
    this.onSubmit = e => {
      e.preventDefault();
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
          this.props.submit(this.state.data.username , this.state.data.password)
      }
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
    const username = this.props.username;
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const password = this.props.password;
    const cpassword = this.props.cpassword;
    
    
    return (
      <div className="wrapper auth-page">
      

        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12 form-block">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              

              <form onSubmit={this.submitForm(username, firstName , lastName , password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={this.changeUsername} />
                  </fieldset>
                  { this.state.errors.username ? <small></small> : null}
                  
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={this.changeFirstName} />
                  </fieldset>
                  { this.state.errors.username ? <small></small> : null}
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={this.changeLastName} />
                  </fieldset>
                  { this.state.errors.username ? <small></small> : null}
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>
                  { this.state.errors.username ? <small></small> : null}
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Confirm Password"
                      value={cpassword}
                      onChange={this.changeCPassword} />
                  </fieldset>
                  

                  <button 
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
