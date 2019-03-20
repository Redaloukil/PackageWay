import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { UPDATE_FIELD_AUTH , REGISTER , REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

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
  onSubmit: (username , firstName , lastName ,password , userType ) => {
      const payload = agent.Auth.register(username,password);
      dispatch({ type: REGISTER, payload })},
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
    this.changeLastName = ev => this.props.onChangeLastName(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeCPassword = ev => this.props.onChangeCPassword(ev.target.value);
    this.changeUserType = ev => this.props.onChangeUserType(ev.target.value);
    this.submitForm = (username, firstName , lastName ,  password , userType ) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username,password);
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
    const userType = this.props.userType;
    
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, firstName , lastName , password , userType )}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.changeUsername} />
                  </fieldset>
                  
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="First Name"
                      value={this.props.firstName}
                      onChange={this.changeFirstName} />
                  </fieldset>
                  
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Last Name"
                      value={this.props.lastName}
                      onChange={this.changeLastName} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Confirm Password"
                      value={this.props.cpassword}
                      onChange={this.changeConfirmPassword} />
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
