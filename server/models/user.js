"use strict";

const bookshelf = require("./bookshelf");

const unauthorizedError = require("../helpers/unauthorizedError");
const encryptPassword = require("../helpers/encryptPassword");
const createSalt = require("../helpers/createSalt");

function onCreate(model, attrs, options) {
  return encryptPassword(model.get("password"), createSalt(128))
    .then(password => model.set("password", password));
}

const emailRegex = /^\S+@\S+$/;
function onSave(model, attrs, options) {
  const email = model.get("email");
  const errors = [];
  if (!emailRegex.test(email)) {
    errors.push("Invalid email:", email);
  }

  const username = model.get("username");
  if (!username) {
    errors.push("Username required");
  }

  const password = model.get("password");
  if (!password) {
    errors.push("Password required");
  }

  if (errors.length) {
    const err = new Error(errors.join("\n"));
    err.status = 400;
    throw err;
  }
}

const User = bookshelf.Model.extend({
  tableName: "users",
  hasTimestamps: true,
  hidden: ["password"],

  videos() {
    return this.hasMany(bookshelf.model("Video"));
  },

  initialize() {
    this.on("creating", onCreate);
    this.on("saving", onSave);
  }
}, {
  verify(credentials) {
    return User.forge({
      username: credentials.username
    }).fetch()
    .then(user => {
      if (!user) {
        return Promise.reject(unauthorizedError());
      }

      const encryptedPassword = user.get("password");
      const salt = encryptedPassword.substr(0, encryptedPassword.indexOf("=") + 1);

      return encryptPassword(credentials.password, salt)
        .then(password => {
          if (password !== encryptedPassword) {
            return Promise.reject(unauthorizedError());
          }
          return user;
        });
    });
  }
});



module.exports = User;