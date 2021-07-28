const express = require('express');
const router = express.Router();
const unsplash = require('../../unsplash');

const Photo = require('../../models/Photo');
const User = require('../../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

// Get user from db by unsplashId
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ unsplashId: id });
    const photos = await Photo.find({ unsplashId: { $in: user.photos } }).sort('-created_at');
    user.photos = photos;
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// Search for unsplash users by username
router.post('/search/username', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if user already exists in db
    const findUser = await User.findOne({ username }).exec();
    if (findUser) {
      return res.status(400).json({ msg: `User '${username}' is already saved in the database` });
    }

    const user = await unsplash.users.get({ username });
    const modifiedUser = Object.assign({ unsplashId: user.response.id }, user.response);
    modifiedUser.photos = [];

    // Save user to db
    const newUser = new User(modifiedUser);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

// Get an unsplash user's photos
router.post('/search/username/photos', async (req, res) => {
  const { username, page, perPage } = req.body;
  
  try {
    const photos = await unsplash.users.getPhotos({ username, page, perPage });
    res.json(photos);
  } catch (err) {
    res.json(err);
  }
});

// Search for unsplash users by query string
router.post('/search', async (req, res) => {
  const { query, page, perPage } = req.body;

  try {
    const users = await unsplash.search.getUsers({ query, page, perPage });
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
