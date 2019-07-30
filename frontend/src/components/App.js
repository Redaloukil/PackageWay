import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Dashbord from '../components/Dashbord';
import Register from '../components/Register';
import Settings from '../components/Settings';
import Footer from './Footer';

import { store } from '../store';
import { push } from 'react-router-redux';
import '../styles/style.css';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillMount() {
    //set token if exists
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    //if token exists get current user
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }
  
  

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />
          
          <main id="content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login/" component={Login} />
              <Route path="/register/" component={Register}/>
              <Route path="/edit/" component={Editor}/>
              <Route path="/edit/:id/" component={Editor}/>
              <Route path="/dashbord/" component={Dashbord}/>
              <Route path="/settings/" component={Settings}/>
            </Switch>
          <Footer/>
          </main>  
          
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}/>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
