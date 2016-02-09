"use strict";

const crypto = require("crypto");

function createSalt(length) {
  return crypto.randomBytes(length).toString("base64");
}

module.exports = createSalt;