const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = new Schema({
  unsplashId: { type: String, unique: true, },
  created_at: Date,
  updated_at: Date,
  width: Number,
  height: Number,
  description: String,
  alt_description: String,
  urls: Schema.Types.Mixed,
  links: Schema.Types.Mixed,
  categories: [Schema.Types.Mixed],
  user: Schema.Types.Mixed,
  likes: Number,
  views: Number,
  downloads: Number,
});

module.exports = mongoose.model('Photo', Photo);
