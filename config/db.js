const db_env = process.env.DB_ENV || 'development'

const config = require('../knexfile')
const knex = require('knex')(config[db_env])

// knex.migrate.latest([config])
module.exports = knex