import PackageList from './../PackageList';
import React from 'react';
import agent from '../../agent';


import { connect } from 'react-redux';
import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
    packages : state.packageList.packages,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: DASHBORD_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: DASHBORD_PAGE_UNLOADED })
});

class PackagesList extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Packages.perUser());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="profile-page">
        <PackageList packages={this.props.packages}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesList);
