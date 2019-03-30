import React from 'react';
import agent from '../../agent';
import ParcelActions from './ParcelActions';



const Parcel = props => {
  return (
      <div className="parcel-item">
        <h1>{props.parcel.title}</h1>
        <p>{props.parcel.body}</p>
        <p>{props.parcel.largitude}</p>
        <p>{props.parcel.longitude}</p>
        { props.recovered ? <p>Recovered</p> : <p>Not Recovered Yet</p>}
        <p>{props.arrived}</p>
        <ParcelActions id={props.parcel.id} />
      </div>
    )
}
  
export default Parcel;
