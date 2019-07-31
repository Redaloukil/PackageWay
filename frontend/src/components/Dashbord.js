import React from 'react';
import Header from './Header';
import { Link  , Route , Switch} from 'react-router-dom';
import agent from '../agent';
import PackagesList from './Packages/PackagesList';
import RequestsList from './Requests/RequestsList';
import Donate from './Donation/index';
import Settings from './Settings';
 import { connect } from 'react-redux';
import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED
} from '../constants/actionTypes';
import '../styles/dashbord.css';


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
      
        
          <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashbord/packages/">
                  My packages
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashbord/notrecovered/">
                  Not Recovered
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashbord/recovered/">
                  Recovered
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashbord/requests/">
                  Recovered
                </Link>
              </li>
          </ul>
        
      
      
      
    );
  }

  render() {
    return (
      <div className="dashbord">
        <div className="container-fluid"> 
          <div className="row">
            <div id="left-bar"className="col-sm-2">
              {this.renderTabs()}
            </div>
            <div className="col-sm-8">
              <Switch>
                <Route exact path="/dashbord/packages/" component={PackagesList}/>
                <Route exact path="/dashbord/donate/" component={Donate}/>
                <Route exact path="/dashbord/requests/" component={RequestsList}/>
                <Route exact path="/dashbord/settings/" component={Settings}/>
              </Switch>
            </div>

          </div>
      
      

        </div>
                

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbord);
