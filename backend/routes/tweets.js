const express = require("express");
const router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const Hashtag = require("../models/hashtags");
const hashtags = require("../models/hashtags");

// ============================================================
// Gestion de l'extraction des #
// ============================================================
const extractHashtags = (text = '') =>
  (text.match(/#\w+/g) || []).map((tag) => tag.toLowerCase());

// ============================================================
// GET /tweets - Récupère tous les tweets
// ============================================================
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find()

      .populate("user", "firstname username") // enrichi les champs on pourrait faire -"..."
      .populate("hashtags", "tag")
      .sort({ createdAt: -1 }) // tri
      .limit(50);

    res.json({ result: true, tweets });
  } catch (error) {
    res.json({ result: false, error: "Failed to fetch tweets" });
  }
});

// ============================================================
// POST Création du tweet
// ============================================================
router.post("/", async (req, res) => {
  try {
    // champs requis sinon ne passe pas
    if (!checkBody(req.body, ["text", "token"])) {
      return res.json({ result: false, error: "Missing fields" });
    }

    // Si token = user else: error
    const user = await User.findOne({ token: req.body.token });
    if (!user) {
      return res.json({ result: false, error: "Invalid token" });
    }

    // Création et sauvegarde du tweet
    const tweet = await new Tweet({
      text: req.body.text,
      user: user._id,
    }).save();

    // On utilise la logique d'extract
    const tags = extractHashtags(req.body.text);

    if (tags.length) {
      const hashtagIds = [];

      for (const tag of tags) {
        // Nouvelles methodes Mongo DB findOneAndUpdate & addToSet & upsert
        // upsert : la magie update et insert si conditions réunies
        // dans mon cas : trouve et mets à jour
        const hashtag = await Hashtag.findOneAndUpdate(
          //comment ça fonctionne (I guess...)
          { tag }, // trouve ce tag
          { $addToSet: { tweets: tweet._id } }, // puis tu feras...addToSet (ajout au tableau sans doublon)
          { new: true, upsert: true, setDefaultsOnInsert: true } //upSert crée le doc s'il n'existe pas
        );
        hashtagIds.push(hashtag._id);
      }

      // on met à jour le tweet avec les IDs des hashtags
      tweet.hashtags = hashtagIds;
      await tweet.save();
    }

    // Enrichis avant de le passe au front
    const populated = await tweet.populate([
      { path: "user", select: "firstname username" },
      { path: "hashtags", select: "tag" },
    ]);

    return res.json({ result: true, tweet: populated });
  } catch (error) {
    res.json({ result: false, error: "Failed to create tweet" });
  }
});

// ============================================================
// DELETE
// ============================================================
router.delete("/:id", async (req, res) => {
  try {
    // Token check
    if (!checkBody(req.body, ["token"])) {
      return res.json({ result: false, error: "Missing token" });
    }

    const user = await User.findOne({ token: req.body.token });
    if (!user) {
      return res.json({ result: false, error: "Invalid token" });
    }

    // Trouve le tweet à supprimer
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.json({ result: false, error: "Tweet not found" });
    }

    // Seul l'user du tweet peut delete
    if (tweet.user.toString() !== user._id.toString()) {
      return res.json({ result: false, error: "Not authorized" });
    }

    // Supprime
    await Tweet.findByIdAndDelete(req.params.id);

    // 5. Nettoie les références dans les hashtags
    // $pull : retire le tweetId de tous les hashtags qui le contiennent
    await Hashtag.updateMany(
      { tweets: tweet._id },
      { $pull: { tweets: tweet._id } }
    );

    return res.json({ result: true });
  } catch (error) {
    res.json({ result: false, error: "Failed to delete tweet" });
  }
});



module.exports = router;
