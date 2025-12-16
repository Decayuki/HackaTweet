const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema(
  {
    tag: { type: String, required: true, unique: true },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('hashtags', hashtagSchema);
