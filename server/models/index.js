"use strict";

const bookshelf = require("./bookshelf");

bookshelf.plugin("registry");
bookshelf.plugin("visibility");

bookshelf.model("User", require("./user"));
bookshelf.model("Video", require("./video"));

module.exports = bookshelf;