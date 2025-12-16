const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstname: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
