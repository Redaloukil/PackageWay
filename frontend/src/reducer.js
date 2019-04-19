import parcel from './reducers/parcel';
import packageList from './reducers/packageList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/dashbord';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  parcel,
  packageList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  router: routerReducer
});
