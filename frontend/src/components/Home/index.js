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
      <section id="slider" className="bd-example">
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://via.placeholder.com/2000x1000" width="100%" height="300px" classNameName="d-block w-100" />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/2000x1000" className="d-block w-100" width="100%" height="300px" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/2000x1000" className="d-block w-100" width="100%" height="300px" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
      <section id="ourstory">
        <div className="container">
        <div className="text-center">
        <h1 className="section-title">
          Our Story
        </h1>
        </div>
        
        <div className="row">
          <div className="col-sm-7">
            <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment</p>
          </div>
          <div className="col-sm-5">
            <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" width="100%"/>
          </div>
        </div>
        </div>
      </section>
      <section id="ourcauses">
        <div className="container">
        <h1 className="section-title">Our Causes</h1>
        <div className="row">
          <div className="col-sm-4">
            <div className="cause">
              <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" width="100%"/>
              <h2>Title 1</h2>
              <strong>A description of the title</strong>
              <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut</p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="cause">
              <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" width="100%"/>
              <h2>Title 2</h2>
              <strong>A description of the title</strong>
              <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut</p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="cause">
              <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" width="100%"/>
              <h2>Title 3</h2>
              <strong>A description of the title</strong>
              <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut</p>
            </div>
          </div>
        </div>
        </div>
      </section>
      <section className="bd-example" id="testimonials">
      
      <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            
<div className="carousel-caption d-none d-md-block">
              <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"/>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>
          <div className="carousel-item">
            
            <div className="carousel-caption d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"/>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="carousel-item">
            
            <div className="carousel-caption d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"/>
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    
      </section>
      <section id="">
        <div className="container">
        <h1 className="section-title">Our Story</h1>
        <div className="row">
          <div className="col-sm-7">
            <img src="https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" width="100%"/>
          </div>
          <div className="col-sm-5">
            <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment</p>
          </div>
          
        </div>
        </div>
      </section>
      <footer>
      </footer>
          
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
