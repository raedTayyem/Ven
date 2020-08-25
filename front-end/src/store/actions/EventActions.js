import { EventService } from '../../services/EventService';

export function loadEvents(filterBy = null, sortBy = null) {
  return async (dispatch) => {
    try {
      const events = await EventService.query(filterBy, sortBy);
      dispatch({ type: 'SET_EVENTS', events });
    } catch (err) {
      console.log('cannot get events', err);
    }
  };
}

export function loadEvent(eventId){
  
    return async dispatch => {
        try {
            const event = await EventService.getById(eventId);
            dispatch({type: 'SET_EVENT' , event})
        } catch(err){
            console.log('cannot get event, too bad' , err)
        }
    }
}

export function removeEvent(eventId) {
  return async (dispatch) => {
    try {
      await EventService.remove(eventId);
      dispatch({ type: 'REMOVE_TOY', eventId });
    } catch (err) {
      console.log('cannot remove event');
    }
  };
}

export function saveEvent(event) {
  
  
  return async (dispatch) => {
    
    try {
      const type = event._id ? 'UPDATE_EVENT' : 'ADD_EVENT';  
    
      const savedEvent = await EventService.save(event);
      dispatch({ type, savedEvent });
      return savedEvent
    } catch (err) {
      console.log('cant save event');
    }
  };
}

export function addReview(event, review) {
  return async (dispatch) => {
    try {
      const savedEvent = await EventService.addReview(event, review);
      dispatch({ type: 'UPDATE_EVENT', savedEvent });
    } catch (err) {
      console.log('cannot update event', err);
    }
  };
}
