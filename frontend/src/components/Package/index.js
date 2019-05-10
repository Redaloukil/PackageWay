import React from 'react';
import agent from '../../agent';
import PackageActions from './PackageActions';



const Package = props => {
  return (
      <div className="package-item">
        <h1 className="h2">{props.packages.content}</h1>
        <p>{props.packages.largitude}</p>
        <p>{props.packages.longitude}</p>
        { props.packages.recovered ? <p>Recovered</p> : <p>Not Recovered Yet</p>}
        <p>{props.packages.arrived}</p>
                  <PackageActions id={props.packages.id} />
        
        
      </div>
    )
}
  
export default Package;
