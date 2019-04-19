import React from 'react';
import agent from '../../agent';
import PackageActions from './PackageActions';



const Package = props => {
  return (
      <div className="parcel-item">
        <h1>{props.package.title}</h1>
        <p>{props.package.body}</p>
        <p>{props.package.largitude}</p>
        <p>{props.package.longitude}</p>
        { props.recovered ? <p>Recovered</p> : <p>Not Recovered Yet</p>}
        <p>{props.arrived}</p>
        <PackageActions id={props.package.id} />
      </div>
    )
}
  
export default Package;
