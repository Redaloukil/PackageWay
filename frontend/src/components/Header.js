import React from 'react';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants/actionTypes';
import { connect } from 'react-redux';
import agent from '../agent';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>
        

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashbord/" className="nav-link">
            Dashbord
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/edit/" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings/" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>
        
        <li className="nav-item">
          <Link
            onClick={props.logout}
            className="nav-link">
            Logout
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

const mapDispatchToProps = ( dispatch ) => ({
  logout : () => {dispatch({ type : LOGOUT})}
})

class Header extends React.Component {
  constructor(){
    super();
    this.logout = () => {
      agent.Auth.logout();
      this.props.logout();
    }
  }
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <a className="navbar-brand">
            {this.props.appName}
          </a>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView logout={this.logout} currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default connect(() => {} , mapDispatchToProps)(Header);
