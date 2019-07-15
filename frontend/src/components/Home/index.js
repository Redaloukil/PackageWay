import Banner from './Banner';
import React from 'react';
import { connect } from 'react-redux';
import '../../styles/home.css';
import Header from './Header';
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
        <section id="presentation" className="">
          <div className="center">
          <p className="section-paragraph">hello world this me helping good humans making good things in this beautiful happy world</p>
            <h1 className="section-title">Millions of people around deserve your donations</h1>
            
          </div>
          <div className="container">
            <div className="row"> 
              <div className="col-sm-7">
                <div id="who">
                  <h1>Who Are we ?</h1>
                  <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de limprimerie depuis les années 1500 réaliser</p>
                  <button className="action">Join our Community</button>
                </div>
              </div>
              <div className="col-sm-5">
                <img src="https://images.unsplash.com/photo-1516510717845-1d1758eb0824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" width="100%"/>
              </div>  
            </div>
          </div>
        
          
          
        </section>
        <section id="ourstory">
          <h1></h1>
          
          
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
