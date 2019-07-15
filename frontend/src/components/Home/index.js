import Banner from './Banner';
import React from 'react';
import { connect } from 'react-redux';
import '../../styles/home.css';
import Header from '../Header';
import Footer from './Footer';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  
} from '../../constants/actionTypes';



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
        <Header/>
        <section id="" className="">
          
        </section>
        <section id="ourstory">
          
          
          
        </section>
      <section className="bd-example" id="testimonials">
      
      </section>
      <section id="">
        
      </section>
      <Footer/>
          
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
