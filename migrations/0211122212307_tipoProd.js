exports.up = function(knex) {
  return knex.schema.createTable('tipo_prod', table => {
      table.increments('id').primary()
      table.string('descricaoTipo').notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipo_Prod')
};
