import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'



export const MyMapComponent = withScriptjs(withGoogleMap((props) =>


 <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>

))




