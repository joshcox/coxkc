
exports.up = async (knex) => {
    await knex.schema.createTable('contact', (table) => {
        table.increments('contactId');
        table.string('firstName');
        table.string('lastName');
        table.string('email');
        table.string('phone');
        table.string('address');
    });

    await knex.schema.createTable('invitation', (table) => {
        table.increments('invitationId');
        table.string('name');
        table.integer('pluses');
        table.timestamps();
    });

    await knex.schema.createTable('invitation_guest', (table) => {
        table.integer('invitationId').unsigned().notNullable();
        table.integer('guestId').unsigned().notNullable();

        table.foreign('guestId').references('contactId').inTable('contact');
        table.foreign('invitationId').references('invitationId').inTable('invitation');
    });

    await knex.schema.createTable('rsvp', (table) => {
        table.increments('rsvpId');
        table.integer('pluses');
        table.boolean('accepted');
        table.timestamps();
        table.string('dietaryRestrictions');
        table.string('comment');
    });

    await knex.schema.createTable('invitation_rsvp', (table) => {
        table.integer('invitationId').unsigned().notNullable();
        table.integer('rsvpId').unsigned().notNullable();

        table.foreign('invitationId').references('invitationId').inTable('invitation');
        table.foreign('rsvpId').references('rsvpId').inTable('rsvp');
    });

    await knex.schema.createTable('event', (table) => {
        table.increments('eventId');
        table.string('name');
        table.date('startDate');
        table.date('endDate');
    });

    await knex.schema.createTable('event_invitation', (table) => {
        table.integer('eventId').unsigned().notNullable();
        table.integer('invitationId').unsigned().notNullable();

        table.foreign('eventId').references('eventId').inTable('event');
        table.foreign('invitationId').references('invitationId').inTable('invitation');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('invitation_guest');
    await knex.schema.dropTable('invitation_rsvp');
    await knex.schema.dropTable('event_invitation');
    await knex.schema.dropTable('contact');
    await knex.schema.dropTable('invitation');
    await knex.schema.dropTable('rsvp');
    await knex.schema.dropTable('event');
};