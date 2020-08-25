const express = require('express');
const router = express.Router();
const { getEvents, getEvent, updateEvent , addEvent } = require('./event.controller');
const { requireAuth } = require('../../middlewares/require.Auth.middleware')


router.get('/', getEvents);
router.get('/:eventId', getEvent);
router.put('/:eventId', updateEvent);
router.post('/', addEvent);

module.exports = router;