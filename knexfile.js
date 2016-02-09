// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './data/stage.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/prod.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
