import Geocode from "react-geocode";
// import { getDistance } from 'geolib';
// import { EventService } from './EventService';

Geocode.setApiKey("AIzaSyAomBI0lRzP0QpN31wTxSY3V8W8LRVYTHI");
Geocode.setRegion("il");

function getLatLng(loc) {
    return (

        Geocode.fromAddress(loc).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
                return {lat,lng}
            },
            error => {
                console.error(error);
            }
            )
    )  
    
}

async function getClosestEvents(userLoc) {
    try {
        // const events = await EventService.query()
      

    } catch {

    }
  }

  getClosestEvents()

export const GeolocationService = {
    getLatLng
    
}