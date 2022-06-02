import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho");

const containerStyle = {
  position: 'absolute',
  bottom: '0',
  height: '90.25vh',
  width: '83%'
};

const options = {
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
}

function MyMap(props) {
  const [center, changeCenter] = useState();
  const [markers, setMarkers] = useState([]);
  const [recenter, setRecenter] = useState(null);

  useEffect(() => {
    console.log('test0')
    setRecenter(props.recenter)
    console.log('props', props.recenter)
    console.log('center', recenter)
    if (props.recenter === null) {
      console.log('bruh')
      return;
    }
    Geocode.fromAddress(props.eventDict[props.recenter].address).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        console.log('test1')
        console.log(lat, lng)
        map.panTo({lat: lat, lng: lng})
      },
      (error) => {console.error(error)}
    )
  }, [props.recenter])

  useEffect(() => {
    Geocode.fromAddress(props.zipcode).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        changeCenter({lat: lat, lng: lng})
        console.log('test3')
      },
      (error) => {console.error(error)}
    )

    props.eventNames.map((eventName, idx) => (
      Geocode.fromAddress(props.eventDict[eventName].address).then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location;
          setMarkers(current => [...current, {
            lat: lat,
            lng: lng,
            key: idx,
            name: eventName,
            infowindow: new window.google.maps.InfoWindow({
              content: eventName
            })
          }])
        },
        (error) => {console.error(error)}
      )
    ))
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
          options={options}
        >
          {markers.map((marker) => (
            <Marker
              //key={marker.key}
              title={marker.name}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: "/chipinArrow.png",
                scaledSize: new window.google.maps.Size(30,50)
              }}
              onMouseOver={() => {
                marker.infowindow.open(map, marker)
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : <h2>Map loading..</h2>
}

export default MyMap