"use strict";

const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile[process.env.NODE_ENV || "development"]);

const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;