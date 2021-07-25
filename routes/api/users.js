const express = require('express');
const router = express.Router();

const unsplash = require('../../unsplash');

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
