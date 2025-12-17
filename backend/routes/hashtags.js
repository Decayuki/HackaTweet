const express = require("express");

const Hashtag = require("../models/hashtags");
const hashtags = require("../models/hashtags");

const router = express.Router();

router.get("/", async (req, res) => {
  const hashtags = await Hashtag.find()
    .select("tag tweets updatedAt")
    .sort({ updatedAt: -1 })
    .limit(20);

  res.json({ result: true, hashtags });
});
// Get récupérer tous les tweets selon hashtag
router.get("/:tag", (req, res) => {
  const tag = req.params.tag.toLocaleLowerCase();
  Hashtag.findOne({ tag })
    .populate({
      // Remplace les ObjectId des tweets par les documents tweets complets.
      path: "tweets",
      // Pour chaque tweet : remplace l'ObjetId user, par l'objet user, en ne gardant que username et firstname
      populate: { path: "user", select: "username firsname" },
    })
    .then((hashtag) => {
      if (!hashtag) {
        res.json({ result: false, message: "Hashtag not found" });
      }
    });
});

module.exports = router;
