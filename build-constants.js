"use strict";

const path = require("path");

module.exports = {
  APP_PATH: path.resolve(__dirname, "client"),
  BUILD_PATH: path.resolve(__dirname, "server", "public")
};
