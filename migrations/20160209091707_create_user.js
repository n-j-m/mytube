"use strict";

const table = (t) => {
  t.increments().primary();
  t.string("email");
  t.string("password");
  t.timestamps();
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table)
    .then(() => console.log("users table created"));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users", table)
    .then(() => console.log("users table droped"));
};
