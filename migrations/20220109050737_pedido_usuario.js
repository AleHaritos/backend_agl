exports.up = function(knex) {
  return knex.schema.alterTable('pedidos', table => {
    table.integer('idUsuario').defaultTo(null)
  })
};

exports.down = function(knex) {
  
};
