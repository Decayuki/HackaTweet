const express = require('express');

const Hashtag = require('../models/hashtags');

const router = express.Router();

// ============================================================
// GET /hashtags - Récupère tous les hashtags 
// ============================================================

router.get('/', async (req, res) => {
  const hashtags = await Hashtag.find()
    .select('tag tweets updatedAt')
    .sort({ updatedAt: -1 })
    .limit(20);

  res.json({ result: true, hashtags });
});

// ============================================================
// GET /hashtags - Récupère UN hashtags
// ============================================================
router.get("/:tag", (req, res) => {
  // L'URL sera /hashtags/react, on ajoute le # pour chercher "#react" en DB
  const tag = `#${req.params.tag.toLowerCase()}`;

  Hashtag.findOne({ tag }) //({ tag: '#' + tag }) ou... #${tag}
    .populate({
      path: "tweets",
      populate: { path: "user", select: "username firstname" },  
    })
    .then((hashtag) => {
      if (!hashtag) {
        return res.json({ result: false, error: "Hashtag not found" });
      }
      res.json({ result: true, hashtag });
    })
    .catch((error) => {
      res.json({ result: false, error: "Failed to fetch hashtag" });
    });
});

module.exports = router;
