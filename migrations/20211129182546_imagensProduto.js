exports.up = function(knex) {
  return knex.schema.createTable('img_produto', table => {
      table.increments('id').primary()
      table.string('imagem').notNull()
      table.integer('idProduto').references('id').inTable('produtos')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('img_produto')
};
