import React from 'react';
import {Link} from 'react-router-dom';
import Parcel from './Parcel/index';

const ParcelList = props => {
  if (!props.parcels) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }
  
  if (props.parcels.length === 0) {
    return (
      <div className="article-preview">
        No parcels are created here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.parcels.map((parcel , key) => {
          return (
            <Parcel parcel={parcel} key={key}/>
          );
        })
      }
    </div>
  );
};

export default ParcelList;
