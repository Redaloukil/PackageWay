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
      <section id="slider" class="bd-example">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://via.placeholder.com/1000x300" class="d-block w-100" width="100%" height="300px" alt="..."/>
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://via.placeholder.com/1000x300" class="d-block w-100" width="100%" height="300px" alt="..."/>
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://via.placeholder.com/1000x300" class="d-block w-100" width="100%" height="300px" alt="..."/>
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>
      <section id="ourstory">
        <div className="container">
        <h1 className="text-center">Our Story</h1>
        <div className="row">
          <div className="col-sm-7">
            <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment</p>
          </div>
          <div className="col-sm-5">
            <img src="https://via.placeholder.com/1000x400" width="100%"/>
          </div>
        </div>
        </div>
      </section>
      <section id="ourcauses">
        <div className="container">
        <h1 className="text-center">Our Causes</h1>
        <div className="row">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-4">
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        </div>
      </section>
          
          
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
