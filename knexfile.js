// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database : 'agl',
      user : 'postgres',
      password : '1234'

    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
    production: {
      client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }},
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }

};
