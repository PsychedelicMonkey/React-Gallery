import { combineReducers } from 'redux';
import authReducer from './authReducer';
import galleryReducer from './galleryReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  gallery: galleryReducer,
  search: searchReducer,
});
