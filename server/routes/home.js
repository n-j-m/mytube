"use strict";

const indexRouter = require("express").Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

indexRouter.use("/", (req, res, next) => {
  res.render("404");
});

module.exports = indexRouter;