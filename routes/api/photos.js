const express = require('express');
const router = express.Router();
const unsplash = require('../../unsplash');

const Photo = require('../../models/Photo');
const User = require('../../models/User');

// Get all photos from db
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort('-created_at');
    res.json(photos);
  } catch (err) {
    res.json(err);
  }
});

// Get photo from db by unsplashId
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await Photo.findOne({ unsplashId: id }).exec();
    const user = await User.find({ unsplashId: { $in: photo.user } }).exec();
    photo.user = user;
    res.json(photo);
  } catch (err) {
    res.json(err);
  }
});

// Add unsplash photo to db
router.post('/add', async (req, res) => {
  const { photoId } = req.body;

  try {
    const photo = await unsplash.photos.get({ photoId });
    const modifiedPhoto = Object.assign({ unsplashId: photo.response.id }, photo.response);
    modifiedPhoto.user = modifiedPhoto.user.id;

    const newPhoto = new Photo(modifiedPhoto);
    const savedPhoto = await newPhoto.save();

    // Check if unsplash user exists in db
    const findUser = await User.findOne({ unsplashId: savedPhoto.user }).exec();
    if (!findUser) {
      const user = await unsplash.users.get({ username: photo.response.user.username });
      const modifiedUser = Object.assign({ unsplashId: user.response.id }, user.response);

      // Save user to db if not exists
      const newUser = new User(modifiedUser);
      newUser.photos = [];
      newUser.photos.push(savedPhoto.unsplashId);
      await newUser.save();
    } else {
      // Add photo to existing user
      findUser.photos.push(savedPhoto.unsplashId);
      await findUser.save();
    }

    res.json(savedPhoto);
  } catch (err) {
    res.json(err);
  }
});

// Search for unsplash photos by query string
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
