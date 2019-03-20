import {
  PARCEL_PAGE_LOADED,
  PARCEL_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PARCEL_PAGE_LOADED:
      return {
        ...state,
        article: action.payload,
      };
    case PARCEL_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
