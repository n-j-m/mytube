"use strict";

const path = require("path");

// init file upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, done) {
    done(null, file.fieldname + "_" + String(Date.now()) + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// init router
const videosRouter = require("express").Router();

// data access and authorization
const AuthController = require("../../controllers/auth");
const bookshelf = require("../../models");
const Video = bookshelf.model("Video");

const videosRoute = videosRouter.route("/videos");
videosRoute
  // fetch all videos for the authenticated user
  .get(AuthController.authenticate, (req, res, next) => {
    Video.forge({}).fetchAll({
      withRelated: ["user"]
    })
      .then(videos => res.json(videos))
      .catch(next);
  })
  // upload a video for the authenticated user
  .post(AuthController.authenticate, upload.single("video"), (req, res, next) => {
    const video = new Video(
      Object.assign({}, req.body, {
        user_id: req.user.id,
        path: path.resolve(req.file.path)
      })
    );
    video.save().then(() => res.redirect("/")).catch(next);
  });

module.exports = videosRouter;
