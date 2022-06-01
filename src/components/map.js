import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho");

const containerStyle = {
  height: '80vh',
  width: '1300px'
};

const options = {
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
}

function MyMap(props) {
  const [center, changeCenter] = useState();
  const [markers, setMarkers] = useState([]);
  const [recenter, setRecenter] = useState();

  function componentWillReceiveProps(nextProps) {
    if (nextProps.recenter !== null && nextProps.recenter !== recenter) {
      setRecenter(nextProps.recenter)
      Geocode.fromAddress(nextProps.recenter).then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location;
          map.panTo({lat: lat, lng: lng})
        },
        (error) => {console.error(error)}
      )
    }
  }

  useEffect(() => {
    Geocode.fromAddress(props.zipcode).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        changeCenter({lat: lat, lng: lng})
        setMarkers(current => [...current, {
          lat: lat,
          lng: lng,
          key: 'center'
        }])
      },
      (error) => {console.error(error)}
    )

    props.eventNames.map((eventName, idx) => {
      Geocode.fromAddress(props.eventDict[eventName].address).then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location;
          setMarkers(current => [...current, {
            lat: lat,
            lng: lng,
            key: idx
          }])
        },
        (error) => {console.error(error)}
      )
    })
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho"
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))

  const onLoad = React.useCallback(function callback(map) {
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          componentWillReceiveProps={componentWillReceiveProps}
          options={options}
        >
          {markers.map((marker) => (
            <Marker
              //key={marker.key}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : <h2>Map loading..</h2>
}

export default MyMap