const express = require("express");
const router = express.Router();
const passport = require("passport");

const db = require("../database/dbConfig");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.user;
    db("achievements")
      .where("user_id", id)
      .then(achievements => res.status(200).json(achievements))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Server failed to process query.", err });
      });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.user;
    const { title, description, image } = req.body;
    const newAchievement = { title, description, image, user_id: id };
    db("achievements")
      .insert(newAchievement)
      .returning("id")
      .then(id => res.status(200).json(id))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Server failed to process query.", err });
      });
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const newAchievement = { title, description, image };
    db("achievements")
      .where({ id })
      .update(newAchievement)
      .returning("id")
      .then(id => res.status(200).json(id))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Server failed to process query.", err });
      });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    db("achievements")
      .where({ id })
      .del()
      .returning("id")
      .then(id => res.status(200).json(id))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Server failed to process query.", err });
      });
  }
);

module.exports = router;
