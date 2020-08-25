const eventService = require('./event.service');
const logger = require('../../service/logger.service')

async function getEvents(req, res) {
    
    try {
        const events = await eventService.query(req.query);
        
        res.send(events);
    } catch (err) {
        logger.error('Cannot get events', err);
        res.status(500).send({ error: 'cannot get events' });
    }
}

async function getEvent(req, res) {
  
    try {
        const event = await eventService.getById(req.params.eventId);
        res.send(event);
    } catch (err) {
        logger.error('Cannot get event', err);
        res.status(500).send({ error: 'cannot get event' });
    }
}
async function updateEvent(req, res) {
    
    const event = req.body;
    try {
        await eventService.update(event);
        res.send(event);
    } catch (err) {
        logger.error('Cannot update event', err);
        res.status(500).send({ error: 'cannot update event' });
    }
}

async function addEvent(req, res) {
    var event = req.body;
    await eventService.add(event)
    res.send(event)
}


module.exports = {
    getEvents,
    getEvent,
    updateEvent,
    addEvent
}