"use strict";

function notFound() {
  let err = new Error("Not Found");
  err.status = 404;
  return err;
}

moudle.exports = notFound;