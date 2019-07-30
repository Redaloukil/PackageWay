import React from 'react';
import '../../styles/header.css';

const Header =  ({ appName, token }) => {
  return (
    <header className="header">
        <div id="content">
          <h1>Helping,Healing,Caring</h1>
          <p>Search for the keywords to learn more about each warning.</p>
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
