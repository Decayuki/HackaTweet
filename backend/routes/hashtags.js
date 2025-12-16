const express = require('express');

const Hashtag = require('../models/hashtags');

const router = express.Router();

router.get('/', async (req, res) => {
  const hashtags = await Hashtag.find()
    .select('tag tweets updatedAt')
    .sort({ updatedAt: -1 })
    .limit(20);

  res.json({ result: true, hashtags });
});

module.exports = router;
