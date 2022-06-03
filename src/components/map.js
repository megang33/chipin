import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoBox, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho");

const containerStyle = {
  position: 'absolute',
  bottom: '0',
  height: '91vh',
  width: '80%'
};

const options = {
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
}

function MyMap(props) {
  const [center, changeCenter] = useState();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    console.log('props', props.recenter)
    if (props.recenter === null) {
      console.log('bruh')
      return;
    }
    Geocode.fromAddress(props.eventDict[props.recenter].address).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        map.panTo({lat: lat, lng: lng});
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
            location: props.eventDict[eventName].address
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
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
          {selected ?
                (<InfoWindow
                  position={{
                    lat: selected.lat,
                    lng: selected.lng,
                  }}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div className='info-window'>
                    <div style={{padding: '5px', paddingRight: '15px', marginTop: '-10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <h3>{selected.name}</h3>
                      <p style={{marginTop: '-5px'}}>{selected.location}</p>
                    </div>
                  </div>
                </InfoWindow>) : null}
        </GoogleMap>
      </div>
    </div>
  ) : <h2>Map loading..</h2>
}

export default MyMap