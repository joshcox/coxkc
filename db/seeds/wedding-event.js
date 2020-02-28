
exports.seed = async (knex) => {
  await knex('event').del();
  const [weddingId] = await knex('event').returning('eventId').insert([
      { name: "Wedding" }
  ]);

  await knex('contact').del();
  const [joshId, allisonId] = await knex('contact').returning('contactId').insert([
    { firstName: 'Josh', lastName: 'Cox', email: 'cox.josh.d@gmail.com' },
    { firstName: 'Allison', lastName: 'Trogstad', email: 'atrogstad89@gmail.com' }
  ]);

  await knex('invitation').del();
  const [joshAllisonInvitationId] = await knex('invitation').returning('invitationId').insert([
    { name: 'Josh & Allison', pluses: 2 }
  ]);

  await knex('invitation_guest').del();
  await knex('invitation_guest').insert([
    { invitationId: joshAllisonInvitationId, guestId: joshId },
    { invitationId: joshAllisonInvitationId, guestId: allisonId }
  ]);

  await knex('event_invitation').del();
  await knex('event_invitation').insert([
    { invitationId: joshAllisonInvitationId, eventId: weddingId },
    { invitationId: joshAllisonInvitationId, eventId: weddingId }
  ]);
};
