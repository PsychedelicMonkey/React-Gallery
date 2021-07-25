import { LOAD_GALLERY, LOAD_GALLERY_ERROR } from '../actions/types';

const initialState = {
  photos: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GALLERY:
      return {
        ...state,
        photos: action.payload,
      }
    case LOAD_GALLERY_ERROR:
      return {
        ...state,
        photos: [],
      }
    default:
      return state;
  }
}
