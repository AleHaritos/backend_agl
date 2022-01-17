
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarios').insert([
        {
          id: 1, 
          nome: 'Alexandre',
          email: 'aleharitos@outlook.com',
          telefone: '11978535838',
          senha: '12345678',
          admin: true
          
        },
          
      ]);
    });
};
