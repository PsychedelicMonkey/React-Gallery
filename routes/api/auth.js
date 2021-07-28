const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const AuthUser = require('../../models/AuthUser');

const outputUser = (req, res) => {
  if (req.user) {
    const { id, firstName, lastName } = req.user;
    return res.json({
      id,
      firstName,
      lastName,
    });
  } else {
    return res.status(500).json({ msg: 'Authentication error' });
  }
}

router.get('/checksession', (req, res) => {
  outputUser(req, res);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password required for authentication' });
  }

  passport.authenticate('local')(req, res, () => {
    outputUser(req, res);
  });
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  const findUser = await AuthUser.findOne({ email }).exec();
  if (findUser) {
    return res.status(400).json({ msg: 'Please use a different email address' });
  }

  const newUser = new AuthUser({ firstName, lastName, email, password });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  newUser.password = hash;
  await newUser.save();
  res.json({
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json(req.user);
});

module.exports = router;
