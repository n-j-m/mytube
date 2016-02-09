"use strict";

const indexRouter = require("express").Router();

indexRouter.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = {
  indexRouter
};