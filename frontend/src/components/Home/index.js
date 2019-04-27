import Banner from './Banner';
import React from 'react';
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
        
          
          <div className="container">
              <div id="header-desc">
                <h1>Your Parcel will be right in way.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
              </div>
              
            
          </div>
          <div id="header-tuto" className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="step">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <p>get your bag</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="step">
                <i class="fa fa-truck" aria-hidden="true"></i>  
                <p>get your bag</p>
                  

                </div>
              </div>
              <div className="col-sm-4">
                <div className="step">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <p>get your bag</p>
                </div>
              </div>
            </div>
          </div>
          
          
        </header>
     
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
          <p>nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio</p>
        </div>
        </div>
        </div>
          
        </section>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
