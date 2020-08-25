const initialState = {
    events: [],
    currEvent: null,
    currFilter: null,
}

export function EventReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_EVENTS':
            return {
                ...state, events: action.events
            }
        case 'SET_EVENT':
            return {
                ...state, currEvent: action.event
            }

        case 'UPDATE_EVENT':
            return {
                ...state, 
                events: state.events.map(event => {
                    if (event._id === action.savedEvent._id) return action.savedEvent;
                    else return event
                })
            }

        case 'ADD_EVENT':
            return {
                ...state, events: [...state.events , action.savedEvent]
            }
        case 'REMOVE_EVENT':
            return {
                ...state, event: state.event.filter(event => event._id !== action.eventId)
            }
        case 'SET_FILTER':
            return {
                ...state, currFilter:  action.filter
            }
        default:
            return state
    }
}