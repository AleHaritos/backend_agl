const db_env = process.env.DB_ENV || 'development'

const config = require('../knexfile')[db_env]
const knex = require('knex')(config)

// knex.migrate.latest([config])

module.exports = knex