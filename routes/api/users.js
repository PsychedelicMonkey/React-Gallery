const express = require('express');
const router = express.Router();
const unsplash = require('../../unsplash');

const User = require('../../models/User');

router.post('/search/username', async (req, res) => {
  const { username } = req.body;

  try {
    const findUser = await User.findOne({ username }).exec();
    if (findUser) {
      return res.status(400).json({ msg: `User '${username}' is already saved in the database` });
    }

    const user = await unsplash.users.get({ username });
    const modifiedUser = Object.assign({ unsplashId: user.response.id }, user.response);
    modifiedUser.photos = [];
    const newUser = new User(modifiedUser);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

router.post('/search/username/photos', async (req, res) => {
  const { username, page, perPage } = req.body;
  
  try {
    const photos = await unsplash.users.getPhotos({ username, page, perPage });
    res.json(photos);
  } catch (err) {
    res.json(err);
  }
});

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
