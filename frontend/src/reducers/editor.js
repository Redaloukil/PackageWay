import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  PARCEL_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';
import { KEY } from '../constants/mapKey';

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        title: action.payload ? action.payload.parcel.title : '',
        body: action.payload ? action.payload.parcel.body : '',
        longitude : action.payload ? action.payload.parcel.longitude : '',
        latitude : action.payload ? action.payload.parcel.latitude : '',
        mapKey : action.payload ? KEY : KEY,  
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case PARCEL_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === PARCEL_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
