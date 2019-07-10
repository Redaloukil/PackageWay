import React from 'react';

import Package from './Package';
import '../styles/package.css';

const PackageList = props => {
  if (!props.packages) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }
  
  if (props.packages.length === 0) {
    return (
      <div className="article-preview">
        No parcels are created here... yet.
      </div>
    );
  }

  return (
    
    <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Content</th>
        <th scope="col">Content Type</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      {
        props.packages.map((packages , key) => {
          return (
            <Package packages={packages} key={key}/>
          );
        })
      }
    </tbody>
    </table>
  );
};

export default PackageList;
