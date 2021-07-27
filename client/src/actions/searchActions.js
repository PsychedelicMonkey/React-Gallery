import { SEARCH_ERROR, SEARCH_SUCCESS, SEARCH_LOADING } from './types';

export const searchPhotos = query => dispatch => {
  dispatch({ type: SEARCH_LOADING });

  fetch('/api/photos/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: query,
  })
  .then(res => res.json())
  .then(data => dispatch({
    type: SEARCH_SUCCESS,
    payload: data.response.results,
  }));
}
