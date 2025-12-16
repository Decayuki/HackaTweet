const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 280 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], //indique que le like provient de la collection User
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // same
    hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtags' }],
  },
  { timestamps: true } //devrait gérer l'heure de création & update
);

module.exports = mongoose.model('tweets', tweetSchema);
