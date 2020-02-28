var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const resp = await knex('event')
    .select()
    .innerJoin('event_invitation', 'event.eventId', 'event_invitation.eventId')
    .innerJoin('invitation', 'event_invitation.invitationId', 'invitation.invitationId')
    .innerJoin('invitation_guest', 'invitation.invitationId', 'invitation_guest.invitationId')
    .innerJoin('contact', 'invitation_guest.guestId', 'contact.contactId');

  res.render('index', { title: 'Express', resp: JSON.stringify(resp) });
});

module.exports = router;
