"use strict";

const crypto = require("crypto");

function encryptPassword(password, base64Salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      base64Salt,
      100000,
      512,
      "sha512",
      (err, key) => err ? reject(err) : resolve(base64Salt + key.toString("base64"))
    );
  });
}

module.exports = encryptPassword;