const db_env = process.env.DB_ENV || 'development'

const config = require('../knexfile')[db_env]
const knex = require('knex')(config)

await knex.migrate.latest([config])
await knex.seed.run()
module.exports = knex