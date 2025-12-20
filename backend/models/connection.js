const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB error:', err));
