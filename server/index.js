"use strict";

const path = require("path");

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const makeErrorHandler = require("./helpers/errorHandler");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// app config.
const config = require("./config");
config.initAppSettings(app);

const routes = require("./routes");

app.use(routes.apiRouter, routes.indexRouter);

if (process.env.NODE_ENV !== "production") {
  app.use(makeErrorHandler("development"));
}

app.use(makeErrorHandler("production"));

module.exports = app;