
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'josh', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'allison' },
        { id: 3, name: 'daniel' }
      ]);
    });
};
