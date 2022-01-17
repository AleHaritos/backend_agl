exports.up = function(knex) {
  return knex.schema.createTable('pedidos', table => {
      table.increments('id').primary()
      table.string('cep').notNull()
      table.float('valorTotal').notNull()
      table.integer('numero').notNull()
      table.string('complemento')
      table.string('data').notNull()
      table.integer('idUsuario').defaultTo(null)
  })
};

exports.down = function(knex) {
    return knex.schema.droptable('pedidos')
};
