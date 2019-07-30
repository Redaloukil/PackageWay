import React from 'react';
import '../../styles/header.css';

const Header =  ({ appName, token }) => {
  return (
    <header className="header">
        <div id="content">
          <h1>Helping,Healing,Caring</h1>
          <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble</p>
          <a className="action">Join our community</a>
          <div className="roles">
            <div className="container">
            
            </div>  
          </div>
          
      </div>
    </header>
  );
};

export default Header;
