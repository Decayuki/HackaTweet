const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema(
  {
    name:  String,
    tweets: [ObjectId],
  },
  { timestamps: true }
);

module.exports = mongoose.model('hashtags', hashtagSchema);
