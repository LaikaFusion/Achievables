const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");
const { sign } = require("jsonwebtoken");
const passport = require("passport");

const { SECRET } = process.env;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db("users").then(users => res.json(users));
  }
);

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password };
  db("users")
    .where({ email })
    .first()
    .then(user => {
      if (user) {
        res.status(422).json({
          error: `User with email: ${email} already exists in our database.`
        });
      } else {
        const hash = bcrypt.hashSync(password, 10);
        db("users")
          .insert({ ...newUser, password: hash })
          .returning("id")
          .then(ids => {
            res.status(201).json(ids);
          })
          .catch(err => {
            console.error(err);
            res
              .status(500)
              .json({ error: "Server failed to process query.", err });
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Server failed to process query.", err });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db("users")
    .where({ email })
    .first()
    .then(user =>
      user && bcrypt.compareSync(password, user.password)
        ? sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar
            },
            SECRET,
            { expiresIn: "7d" },
            (err, token) =>
              err
                ? console.error(err)
                : res.status(200).json({
                    message: "Login successful.",
                    token: `Bearer ${token}`
                  })
          )
        : res.status(401).json({ error: "Invalid username or password." })
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Server failed to process query.", err });
    });
});

module.exports = router;
