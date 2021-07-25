import { combineReducers } from 'redux';
import galleryReducer from './galleryReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  gallery: galleryReducer,
  search: searchReducer,
});
