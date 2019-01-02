const express = require("express");
const router = express.Router();
const passport = require("passport");

const db = require("../database/dbConfig");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.user;
    db("tasks")
      .where("user_id", id)
      .then(tasks => res.status(200).json(tasks))
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
    const { title, description, difficulty, reward } = req.body;
    const newTask = { title, description, difficulty, reward, user_id: id };
    db("tasks")
      .insert(newTask)
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
    const { title, description, difficulty, reward } = req.body;
    const newTask = { title, description, difficulty, reward };
    db("tasks")
      .where({ id })
      .update(newTask)
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
    db("tasks")
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
