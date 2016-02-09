"use strict";

const apiRouter = require("express").Router();

const usersRouter = require("./users");
const videosRouter = require("./videos");

apiRouter.use("/api", usersRouter, videosRouter);

apiRouter.use("/api", (req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Not Found"
    }
  });
});

apiRouter.use("/api", (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status: err.status || 500,
      message: err.message,
      error: err.stack
    }
  });
});

module.exports = apiRouter;