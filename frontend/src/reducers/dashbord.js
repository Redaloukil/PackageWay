import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED,
  
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case DASHBORD_PAGE_LOADED:
      return {
        ...action.payload
      };
    case DASHBORD_PAGE_LOADED:
      return {};
    default:
      return state;
  }
};
