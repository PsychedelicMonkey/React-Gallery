import { 
  LOGIN_ERROR, 
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOADED_USER,
  LOADING_USER,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        isLoading: false,
      }
    case LOADED_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: true,
      }
    case LOADING_USER:
      return {
        isLoading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}
