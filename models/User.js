const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  unsplashId: { type: String, unique: true, },
  updated_at: Date,
  username: String,
  first_name: String,
  last_name: String,
  name: String,
  twitter_username: String,
  bio: String,
  location: String,
  links: Schema.Types.Mixed,
  profile_image: Schema.Types.Mixed,
  social: Schema.Types.Mixed,
  photos: [Schema.Types.Mixed],
  followers_count: Number,
  following_count: Number,
});

module.exports = mongoose.model('User', User);
