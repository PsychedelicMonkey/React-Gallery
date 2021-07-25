const config = require('config');
const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');

const unsplash = createApi({
  accessKey: config.get('unsplash.accessKey'),
  fetch,
});

module.exports = unsplash;
