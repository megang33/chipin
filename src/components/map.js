import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Autocomplete from './Autocomplete'
import MyCard from './MyCard.js'
import EventList from './EventList';
import './map.css'

const containerStyle = {
  height: '80vh',
};

const center = {
  lat: 34.071035488041986,
  lng: -118.44324559994142
};

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho"
  })

  const [map, setMap] = React.useState(/** @type google.maps.Map */null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (


    <div class="horizontal">
      <div class="vertical">
        <div>
          <Autocomplete suggestions={["apple", "orange", "grape", "aunty", "ant", "args"]} />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
      <div>
        <EventList>
        </EventList>
      </div>
    </div>
  ) : <h2>Map loading..</h2>
}

export default React.memo(MyMap)