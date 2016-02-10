"use strict";

const videosRouter = require("express").Router();

const AuthController = require("../../controllers/auth");
const bookshelf = require("../../models");
const Video = bookshelf.model("Video");

const videosRoute = videosRouter.route("/videos");

videosRoute
  .get(AuthController.authenticate, (req, res, next) => {
    Video.forge({}).fetchAll({
      withRelated: ["user"]
    })
      .then(videos => res.json(videos))
      .catch(next);
  });

module.exports = videosRouter;
