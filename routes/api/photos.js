const express = require('express');
const router = express.Router();
const unsplash = require('../../unsplash');

const Photo = require('../../models/Photo');

router.post('/add', async (req, res) => {
  const { photoId } = req.body;

  try {
    const photo = await unsplash.photos.get({ photoId });
    const modifiedPhoto = Object.assign({ unsplashId: photo.response.id }, photo.response);
    const newPhoto = new Photo(modifiedPhoto);
    const savedPhoto = await newPhoto.save();
    res.json(savedPhoto);
  } catch (err) {
    res.json(err);
  }
});

router.post('/search', async (req, res) => {
  const { query, page, perPage } = req.body;

  try {
    const photos = await unsplash.search.getPhotos({ query, page, perPage });
    res.json(photos);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
