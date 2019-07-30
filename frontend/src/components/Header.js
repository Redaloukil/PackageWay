import React from 'react';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants/actionTypes';
import { connect } from 'react-redux';
import agent from '../agent';
import '../styles/navbar.css';



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
          <Link to="/" className="nav-link">
            AboutUs
          </Link>
        </li>
        
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Cause
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Partners
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
          <i className="fa fa-sign-in" aria-hidden="true"></i>
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
          <i className="fa fa-address-book" aria-hidden="true"></i>
            Sign up
          </Link>
        </li>
        <li id="navbar-action"className="nav-item">
            <Link to="/login" className="nav-link">
              Donate
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

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser,
  }};

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
      <nav id="navbar-top" className="navbar navbar-light navbar-fixed-top">
        <div id="top-bar">
          <div className="container-fluid">
           <div id="title">
           <div className="text-left">
           <h1>PackageWay.Corp</h1> <p>hello world this is our corporation</p>
           </div>
          </div>
              
              
             
          </div>
        </div>
        <div id="bottom-bar">
          <div className="container">
            <a className="navbar-brand">
              <span>{this.props.appName}</span>
            </a>

            <LoggedOutView currentUser={this.props.currentUser}/>

            <LoggedInView logout={this.logout} currentUser={this.props.currentUser}/>


            </div>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Header);
