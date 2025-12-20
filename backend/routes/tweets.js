const express = require("express");
const router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const Hashtag = require("../models/hashtags");

// ============================================================
// Gestion de l'extraction des #
// ============================================================
const extractHashtags = (text = "") =>
  //regex pour mémo : /#\ = début w+ = alphanum de un ou plrs caractères
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
// ============================================================
// Gestion de Like: liker par user
// ============================================================
router.put("/:id/like", (req, res) => {
  // vérifier token existe ou pas
  if (!checkBody(req.body, ["token"])) {
    return res.json({ result: false, error: "Missing token" });
  }
  // chercher user par token
  User.findOne({ token: req.body.token })
    .then((user) => {
      if (!user) {
        res.json({ result: false, error: "Invalid token" });
        return null;
      }
      // on doit aussi chercher tweet que user like, retourne un objet {user, tweet}
      return Tweet.findById(req.params.id).then((tweet) => ({ user, tweet }));
    })
    .then((data) => {
      // token is invalid
      if (!data) return null;

      const user = data.user;
      const tweet = data.tweet;

      if (!tweet) {
        res.json({ result: false, error: "Tweet not found" });
        return null;
      }
      // tweet.likes est un tableau d’ObjectId (IDs des users qui ont liké).
      const alreadyLiked = tweet.likes.some(
        // comparaison user id en conversion en String
        (id) => id.toString() === user._id.toString()
      );
      // si déjà liker, enlever user id de tableau
      if (alreadyLiked) {
        tweet.likes.pull(user._id); // unlike
      } else {
        // sinon ajouter user id dans le tableau en vérifiant si c'est doublon
        tweet.likes.addToSet(user._id); // like (évite doublon)
      }
      // sauvegarder la modification dans la BDD
      return tweet.save();
    })
    .then((savedTweet) => {
      if (!savedTweet) return;
      res.json({ result: true, likes: savedTweet.likes });
    })
    .catch(() => res.json({ result: false, error: "Like failed" }));
});

module.exports = router;
