"use strict";

function createResponseData(err, env) {
  const data = {
    message: err.message,
    status: err.status || 500
  };

  if (!env || env !== "production") {
    data.error = err;
  }

  return data;
}

function devErrorHandler(err, req, res, next) {
  if (err.status === 404) {
    res.render("404");
  }
  else {
    res.render("error", createResponseData(err));
  }
}

function prodErrorHandler(err, req, res, next) {
  if (err.status === 404) {
    res.render("404");
  }
  else {
    res.render("error", createResponseData(err, "production"));
  }
}

function makeErrorHandler(env) {
  if (env !== "production") {
    return devErrorHandler;
  }

  return prodErrorHandler;
}

module.exports = makeErrorHandler;