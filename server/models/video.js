"use strict";

const bookshelf = require("./bookshelf");

const Video = bookshelf.Model.extend({
  tableName: "videos",
  hasTimestamps: true,
  hidden: ["path"],
  user() {
    return this.belongsTo(bookshelf.model("User"));
  }
});

module.exports = Video;
