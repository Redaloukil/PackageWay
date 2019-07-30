import PackageList from './../PackageList';
import React from 'react';
import agent from '../../agent';


import { connect } from 'react-redux';
import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED,
  SET_PAGE
} from '../../constants/actionTypes';





const mapStateToProps = state => ({
    filters : state.packageList.filters,
    packages : state.packageList.packages,
});

const mapDispatchToProps = dispatch => ({
  setPage : (page , payload) => dispatch({type : SET_PAGE , page , payload }),
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
      <div className="package-page">
        <PackageList packages={this.props.packages}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesList);
