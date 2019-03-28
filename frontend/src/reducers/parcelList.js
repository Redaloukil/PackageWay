import {
  SET_PAGE,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        parcels: action.payload.parcels,
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload[1].parcels,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    
    case DASHBORD_PAGE_LOADED:
      return {
        ...state,
        parcels: action.payload,
      };
    case DASHBORD_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
