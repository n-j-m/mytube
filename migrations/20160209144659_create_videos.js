"use strict";

const tableDef = (t) => {
  t.increments().primary();
  t.integer("user_id").references("id").inTable("user");
  t.string("title");
  t.string("description");
  t.string("path");
  t.timestamps();
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("videos", tableDef)
    .then(() => console.log("videos table created"));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("videos", tableDef)
    .then(() => console.log("videos table dropped"));
};
