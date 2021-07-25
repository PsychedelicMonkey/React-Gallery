const express = require('express');
const router = express.Router();

const unsplash = require('../../unsplash');

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
