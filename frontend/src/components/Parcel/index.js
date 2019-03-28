import ParcelMeta from './ParcelMeta';

import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import marked from 'marked';


const Parcel = props => {
  return (
    <div>
      <Link to="edit{`/@${props.title}`"></Link>
      <p>{props.body}</p>
      <p>{props.largitude}</p>
      <p>{props.longitude}</p>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Parcel);
