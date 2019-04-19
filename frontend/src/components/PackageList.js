import React from 'react';

import Package from './Package';

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

  // return (
  //   <div>
  //     {
  //       props.packages.map((packages , key) => {
  //         return (
  //           <Package packages={packages} key={key}/>
  //         );
  //       })
  //     }
  //   </div>
  // );
};

export default PackageList;
