import { SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_LOADING, } from '../actions/types';

const initialState = {
  photos: [],
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload],
        isLoading: false,
      }
    case SEARCH_ERROR:
      return {
        ...state,
        photos: [],
        isLoading: false,
      }
    default:
      return state;
  }
}
