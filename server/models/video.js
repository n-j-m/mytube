"use strict";

const bookshelf = require("./bookshelf");

const Video = bookshelf.Model.extend({
  tableName: "videos",
  hasTimestamps: true,
  user() {
    return this.belongsTo(bookshelf.model("User"));
  }
});

module.exports = Video;