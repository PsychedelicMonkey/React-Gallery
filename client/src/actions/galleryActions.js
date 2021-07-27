import { 
  LOAD_GALLERY, 
  LOAD_GALLERY_ERROR, 
  ADD_TO_GALLERY, 
  ADD_TO_GALLERY_ERROR
} from './types';

export const loadGallery = () => dispatch => {
  fetch('/api/photos')
  .then(res => res.json())
  .then(data => dispatch({
    type: LOAD_GALLERY,
    payload: data,
  }));
}

export const addToGallery = id => dispatch => {
  fetch('/api/photos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ photoId: id }),
  })
  .then(res => res.json())
  .then(data => dispatch({
    type: ADD_TO_GALLERY,
    payload: data,
  }));
}
