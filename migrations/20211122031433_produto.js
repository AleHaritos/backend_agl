exports.up = function(knex) {
  return knex.schema.createTable('produtos', table => {
      table.increments('id').primary()
      table.float('valor').notNull()
      table.string('nome').notNull()
      table.string('descricao', 200)
      table.boolean('estoque').defaultTo(false)
      table.boolean('promocao').defaultTo(false)
      table.string('valorpromocao')
      table.boolean('destaque').defaultTo(false)
      table.string('url', 200).defaultTo('')
      table.boolean('disponivel').defaultTo(true)
      table.integer('idTipo').references('id').inTable('tipo_prod')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos')
};
