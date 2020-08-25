import React from 'react'

import { EventPreview } from './EventPreview'



export function EventList(props) {

    const { events, atHome, category  } = props
    let eventsByCategory = []
    var limitEvents = events.length;

    if (atHome) {
        limitEvents = 4;
        eventsByCategory = events.filter(event => event.category === category)
    }
    return (
        <div className="event-list  container">
            {!atHome && events.map((event, idx) => { if (idx < limitEvents) return <EventPreview event={event} key={event._id} /> })}
            {atHome && eventsByCategory.map((event, idx) => { if (idx < limitEvents) return <EventPreview event={event} key={event._id} /> })}
        </div>
    )
}
