"use strict";

const path = require("path");

const express = require("express");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// app config.
const config = require("./config");
config.initAppSettings(app);

const routes = require("./routes");

app.use("/", routes.indexRouter);

app.use((req, res, next) => {
  res.render("404");
});

if (process.env.NODE_ENV !== "production") {
  app.use((err, req, res, next) => {
    res.render("error", {
      message: err.message,
      status: err.status || 500,
      error: err
    });
  });
}


app.use((err, req, res, next) => {
  res.render("error", {
    message: err.message,
    status: err.status || 500
  });
});

module.exports = app;