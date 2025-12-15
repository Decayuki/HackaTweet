const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
  {
  description: String,   
  likes: [String],       
  postedTime: Date,
  user: ObjectId → users
  },
  
  { timestamps: true }
);

module.exports = mongoose.model('tweets', tweetSchema);
