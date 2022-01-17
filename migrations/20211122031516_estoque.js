exports.up = function(knex) {
  return knex.schema.createTable('estoque', table => {
      table.increments('id').primary()
      table.integer('quantidade').notNull()
      table.string('tamanho').notNull()
      table.integer('idProduto').references('id')
                            .inTable('produtos')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('estoque')
};
