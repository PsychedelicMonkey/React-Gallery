import { SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/types';

const initialState = {
  photos: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        photos: action.payload,
      }
    case SEARCH_ERROR:
      return {
        ...state,
        photos: [],
      }
    default:
      return state;
  }
}
