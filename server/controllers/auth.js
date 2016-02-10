"use strict";

const jwt = require("jsonwebtoken");

const unauthorizedError = require("../helpers/unauthorizedError");
const bookshelf = require("../models");

const User = bookshelf.model("User");

function getToken(req) {
  let token = req.headers.authorization;

  if (!token) {
    token = req.query.access_token;
  }

  return token;
}

function authenticate(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return next(unauthorizedError());
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) { return next(unauthorizedError(err.message)); }

    User.forge({ id: decoded.id }).fetch()
      .then(user => {
        if (!user) {
          return next(unauthorizedError());
        }

        req.user = user;

        next();
      })
      .catch(next);
  });
}

function authorize(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.verify({ username, password })
    .then(user => {
      if (!user) { return next(unauthorizedError()); }

      jwt.sign(
        user.toJSON(),
        process.env.JWT_SECRET,
        {
          expiresIn: 5 * 60 * 60, // 5 hours
        subject: user.get("username")
        },
        (token) => res.json({ token })
      );
    })
    .catch(next);
}

module.exports = {
  authenticate,
  authorize
};
