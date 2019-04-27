import React from 'react';
import Header from './Header';
import { Link  , Route , Switch} from 'react-router-dom';
import agent from '../agent';
import PackagesList from './Packages/PackagesList';
import NotRecovered from './Packages/NotRecovered';
import Recovered from './Packages/Recovered';

import { connect } from 'react-redux';
import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED
} from '../constants/actionTypes';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};
const mapStateToProps = state => ({
  packages : state.packageList.packages,
  currentUser: state.common.currentUser,
  dashbord: state.dashbord,
  common : state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: DASHBORD_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: DASHBORD_PAGE_UNLOADED })
});

class Dashbord extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Packages.perUser());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to="/dashbord/">
            My packages
          </Link>
          <Link
            className="nav-link"
            to="/dashbord/notrecovered/">
            Not Recovered
          </Link>
          <Link
            className="nav-link"
            to="/dashbord/recovered/">
            Recovered
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="wrapper profile-page">
      <Header appName={this.props.appName} currentUser={this.props.currentUser} />
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <h4>{this.props.currentUser.username}</h4>
                <p>{this.props.currentUser.firstName}</p>
                <p>{this.props.currentUser.lastName}</p>

                <EditProfileSettings/>
                

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
            
              <div className="articles-toggle">
                {this.renderTabs()}
              </div>
              <br/>

              
              <Switch>
                <Route exact path="/dashbord/" component={PackagesList}/>
                <Route path="/dashbord/notrecovered/" component={NotRecovered} />
                <Route path="/dashbord/recovered/" component={Recovered}/>
              </Switch>
              
                
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbord);
