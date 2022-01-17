exports.up = function(knex) {
  return knex.schema.createTable('vendas', table => {
    table.increments('id').primary()
    table.integer('idProduto').references('id').inTable('produtos')
    table.integer('idPedido').references('id').inTable('pedidos')
    table.varchar('tamanho').notNull()
    table.integer('quantidade').notNull()
    // Um pedido pode ter varias vendas e uma venda um pedido
  })
};

exports.down = function(knex) {
  return  knex.schema.dropTable('vendas')
};
