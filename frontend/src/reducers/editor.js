import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  PARCEL_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        title: action.payload ? action.payload.parcel.title : '',
        body: action.payload ? action.payload.parcel.body : '',
        longitude : action.payload ? action.payload.parcel.longitude : '',
        largitude : action.payload ? action.payload.parcel.largitude : '', 
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
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
