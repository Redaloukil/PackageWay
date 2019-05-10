import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  PARCEL_SUBMITTED,
  ASYNC_START,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        content: action.payload ? action.payload.parcel.content : '',
        contentType: action.payload ? action.payload.parcel.contentType : '',
        longitude : action.payload ? action.payload.parcel.longitude : '',
        latitude : action.payload ? action.payload.parcel.latitude : '',
        fromWilaya : action.payload ? action.payload.parcel.fromWilaya : '',
        from : action.payload ? action.payload.parcel.from : '',
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
