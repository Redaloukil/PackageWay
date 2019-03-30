import Banner from './Banner';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import '../../styles/home.css';
import parcelImage from'../../images/parcel.png'
import phoneImage from '../../images/phone.png';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  
} from '../../constants/actionTypes';
import Header from '../Header';


const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: HOME_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount(){
    // this.props.onLoad()
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <header id="header">
        
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />
          <div className="container-fluid">
            <div className="row">
              <div id="header-desc" className="col-sm-7 col-sm-offset-2">
                <h1>Your Parcel will be right in way.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
              </div>
              <div id=""className="col-sm-3">
                <img id="parcel-image" src={parcelImage} width="500px"/>
              </div>
            </div>
          </div>
          
        </header>
        {// <Banner token={this.props.token} appName={this.props.appName} />
    }
        <section id="desc">
        <div className="container">
        <div className="row">
            
        <div className="col-sm-4">
          <img width="100%" height="700px" src={phoneImage}/>
        </div>
        <div className="col-sm-7">
          <h1>Our Transport Area Is Growing Up</h1>
          <h2>The Fastest Way To Transport Your Parcel.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
          <h2>The Fastest Way To Transport Your Parcel.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
          <h2>The Fastest Way To Transport Your Parcel.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>
        </div>
        </div>
          
        </section>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
