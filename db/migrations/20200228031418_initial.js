
exports.up = async function (knex) {
    await knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('name');
        table.timestamps();
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('users');
};
