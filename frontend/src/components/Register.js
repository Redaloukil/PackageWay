
import React from 'react';
import { Link } from 'react-router-dom';

import agent from '../agent';
import { connect } from 'react-redux';
import { UPDATE_FIELD_AUTH , REGISTER , REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';
import '../styles/auth.css';

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
  onChangeCPassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'cpassword', value }),
  onSubmit: (username , firstName , lastName ,password) => {
      dispatch({ type: REGISTER, payload :agent.Auth.register(username, firstName , lastName , password) })},
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
    this.submitForm = ev => {
      ev.preventDefault();
      console.log("start submitting");
      this.onSubmit();
    }
    this.validate = () => {
      console.log("start submitting");
      const username = this.props.username;
      const firstName = this.props.firstName;
      const lastName = this.props.lastName;
      const password = this.props.password;
      const cpassword = this.props.cpassword;
      const errors = {};
      if (!username) errors.username = "Invalid username";
      if (!firstName) errors.firstName = "Invalid first name";
      if (!lastName) errors.lastName = "Invalid last name";
      if (!password) errors.password = "Invalid password"
        
      return errors
      
    }
    this.onSubmit = () => {
      const errors = this.validate();
      this.setState({errors});
      if (Object.keys(this.state.errors).length === 0) {
          this.props.onSubmit(this.props.username ,this.props.firstName,this.props.lastName ,this.password)
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
      <div className="auth-page">
      <div className="banner">
        <div className="container">
          <h1 className="text-xs-left">Signup</h1>
        </div>
      </div>
      
      <div className="container page">
        <div className="row">

          <div className="col-md-10 offset-md-1 col-xs-12 form-block">
            <div class="alert alert-light" role="alert">
              {this.props.errors}
            </div>  
            
            <p className="text-xs-left">
              <Link to="/login">
                Have an account?
              </Link>
            </p>

            

            <form onSubmit={this.submitForm}>
              <fieldset>

                <fieldset className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={this.changeUsername} />
                </fieldset>
                { this.state.errors.username ? <small>Username Field is required</small> : null}
                
                <fieldset className="form-group">
                <label>First Name</label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={this.changeFirstName} />
                </fieldset>
                { this.state.errors.firstName ? <small>First Name field is required</small> : null}
                <fieldset className="form-group">
                  <label>Last Name</label>  
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={this.changeLastName} />
                </fieldset>
                { this.state.errors.lastName ? <small>Last Name field is required</small> : null}
                <fieldset className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword} />
                </fieldset>
                { this.state.errors.password? <small>Password field is required</small> : null}
                <fieldset className="form-group">
                  <label>Confirm Password</label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={this.changeCPassword} />
                </fieldset>
                
                

                <button 
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit">
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
