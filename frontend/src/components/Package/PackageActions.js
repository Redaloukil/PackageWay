  import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_PARCEL } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_PARCEL, payload })
});

const ParcelActions = props => {
  const del = (id) => {
    props.onClickDelete(agent.Packages.del(id))
  };
  if (props) {
    return (
      <span className="package-actions">
        
        <Link
          to={`/edit/${props.id}/`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Parcel
        </Link>
        <button className="btn btn-outline-danger btn-sm" onClick={() => del(props.id)}>
          <i className="ion-trash-a"></i> Delete Parcel
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => {}, mapDispatchToProps)(ParcelActions);
