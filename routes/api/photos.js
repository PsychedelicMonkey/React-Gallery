const express = require('express');
const router = express.Router();
const unsplash = require('../../unsplash');

const Photo = require('../../models/Photo');
const User = require('../../models/User');

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort('-created_at');
    res.json(photos);
  } catch (err) {
    res.json(err);
  }
});

router.post('/add', async (req, res) => {
  const { photoId } = req.body;

  try {
    const photo = await unsplash.photos.get({ photoId });
    const modifiedPhoto = Object.assign({ unsplashId: photo.response.id }, photo.response);
    modifiedPhoto.user = modifiedPhoto.user.id;

    const newPhoto = new Photo(modifiedPhoto);
    const savedPhoto = await newPhoto.save();

    const findUser = await User.findOne({ unsplashId: savedPhoto.user }).exec();
    if (!findUser) {
      const user = await unsplash.users.get({ username: photo.response.user.username });
      const modifiedUser = Object.assign({ unsplashId: user.response.id }, user.response);
      const newUser = new User(modifiedUser);
      newUser.photos = [];
      newUser.photos.push(savedPhoto.unsplashId);
      await newUser.save();
    } else {
      findUser.photos.push(savedPhoto.unsplashId);
      await findUser.save();
    }

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
