"use strict";

const addUsername = (table) => {
  table.string("username").unique();
};

const dropUsername = (table) => {
  table.dropColumn("username");
};

exports.up = function(knex, Promise) {
  return knex.schema.hasColumn("users", "username")
    .then(hasColumn => {
      if (!hasColumn){
        return knex.schema.table("users", addUsername)
          .then(() => true);
      }
      return false;
    })
    .then(changed => console.log("username column was " + (changed ? "" : "not (existed)") + " added"));
};

exports.down = function(knex, Promise) {
  return knex.schema.hasColumn("users", "username")
    .then(hasColumn => {
      if (hasColumn) {
        return knex.schema.table("users", dropUsername)
          .then(() => true);
      }
      return false
    })
    .then(changed => console.log("username column was " + (changed ? "" : "not (did not exist)") + " dropped"));
};
