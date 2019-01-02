const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../database/dbConfig");
require("dotenv").config();
const { SECRET } = process.env;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

const { users, achievements, tasks } = require("../routes");

module.exports = server => {
  server.use(cors());
  server.disable();
  server.use(express.json());
  server.use(helmet());
  server.use(logger("dev"));
  server.use(passport.initialize());
  server.use("/api/users", users);
  server.use("/api/achievements", achievements);
  server.use("/api/tasks", tasks);
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      db("users")
        .where({ id: jwt_payload.id })
        .first()
        .then(user => (user ? done(null, user) : done(null, false)))
        .catch(err => console.error(err));
    })
  );
};
