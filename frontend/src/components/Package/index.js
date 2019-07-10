import React from 'react';
import agent from '../../agent';
import PackageActions from './PackageActions';



const Package = props => {
  return (
      <tr>
      <th scope="row">{props.packages.id}</th>
        <td>{props.packages.content}</td>
        <td>{props.packages.contentType}</td>
        <td>{ props.packages.recovered ? <p>Recovered</p> : <p>Not Recovered Yet</p>}</td>
        
        
        
        
      </tr>
    )
}
  
export default Package;
