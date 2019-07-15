import React from 'react';
import '../../styles/header.css';

const Header = ({ appName, token }) => {
  return (
    <header className="header">
        <div id="content">
          <h1>Helping,Healing,Caring</h1>
          <p>Search for the keywords to learn more about each warning.</p>
          <a className="action">Join our community</a>
          <div className="roles">
          <div className="container">
          <div className="row">
            <div className="col-sm-3"><div className="role"><i class="fa fa-address-book" aria-hidden="true"></i>
            Hello world</div></div>
            <div className="col-sm-3"><div className="role"><i class="fa fa-address-book" aria-hidden="true"></i>
            this is me</div></div>
            <div className="col-sm-3"><div className="role"><i class="fa fa-address-book" aria-hidden="true"></i>
            Hell no</div></div>
            <div className="col-sm-3"><div className="role"><i class="fa fa-address-book" aria-hidden="true"></i>
            Hey maan</div></div>
          </div>
        </div>  
          </div>
          
      </div>
    </header>
  );
};

export default Header;
