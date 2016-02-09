"use strict";

function unauthorizedError(message) {
  const err = new Error(message || "Unauthorized");
  err.status = 401;

  return err;
}

module.exports = unauthorizedError;