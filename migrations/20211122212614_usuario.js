exports.up = function(knex) {
  return knex.schema.createTable('usuarios', table => {
      table.increments('id').primary()
      table.string('nome', 150).notNull()
      table.string('email', 150).notNull().unique()
      table.string('telefone')
      table.string('senha').notNull()
      table.boolean('admin').defaultTo(false)
  })
};

exports.down = function(knex) {
   return knex.schema.droptable('usuarios')
};
