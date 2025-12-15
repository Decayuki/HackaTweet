require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const createError = require('http-errors');

require('./models/connection');

const usersRouter = require('./routes/users');
const tweetsRouter = require('./routes/tweets');
const hashtagsRouter = require('./routes/hashtags');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);
app.use('/hashtags', hashtagsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API ready on port ${port}`);
});

module.exports = app;
