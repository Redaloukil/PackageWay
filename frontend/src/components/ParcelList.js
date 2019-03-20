import ListPagination from './ListPagination';
import React from 'react';

const ParcelList = props => {
  if (!props.parcels) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.articles.map(parcels => {
          return (
            <div>
              
            </div>
          );
        })
      }
    </div>
  );
};

export default ParcelList;
