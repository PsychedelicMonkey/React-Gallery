import { LOAD_GALLERY, LOAD_GALLERY_ERROR } from './types';

export const loadGallery = () => dispatch => {
  fetch('/api/photos')
  .then(res => res.json())
  .then(data => dispatch({
    type: LOAD_GALLERY,
    payload: data,
  }));
}
