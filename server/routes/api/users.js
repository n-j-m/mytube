"use strict";

const userRouter = require("express").Router();

const bookshelf = require("../../models");
const User = bookshelf.model("User");

const usersRoute = userRouter.route("/users");

usersRoute
  .get((req, res, next) => {
    User.forge().fetchAll()
      .then(users => res.json(users))
      .catch(next);
  })
  .post((req, res, next) => {
    User.forge(req.body).save()
      .then(user => res.json(user))
      .catch(next);
  });

const userRoute = userRouter.route("/users/:id");

userRoute
  .get((req, res, next) => {
    User.forge({id: req.params.id}).fetch({
      withRelated: ["videos"]
    })
      .then(user => {
        if (!user) {
          next();
        } else {
          res.json(user);
        }
      })
      .catch(next);
  });

const userVideosRoute = userRouter.route("/users/:id/videos");

userVideosRoute
  .get((req, res, next) => {
    User.forge({id: req.params.id}).fetch({
      withRelated: ["videos"]
    })
      .then(user => user.related("videos"))
      .then(videos => res.json(videos))
      .catch(next);
  });

module.exports = userRouter;
