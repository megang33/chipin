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

  useEffect(() => {
    Geocode.fromAddress(props.zipcode).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        console.log("!", lat, lng);
        console.log(typeof lat);
        changeCenter({lat: lat, lng: lng})
      },
      (error) => {console.error(error)}
    )
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
          <Marker position={center}/>
        </GoogleMap>
      </div>
    </div>
  ) : <h2>Map loading..</h2>
}

export default React.memo(MyMap)




//   // getLatLngByZipcode(zipcode) {
//   //   console.log("Zipcode: ", zipcode);
//   //   var latitude;
//   //   var longitude;
//   //   var geocoder = new window.google.maps.Geocoder();
//   //   var address = zipcode;
//   //   geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
//   //       if (status === window.google.maps.GeocoderStatus.OK) {
//   //           latitude = results[0].geometry.location.lat();
//   //           longitude = results[0].geometry.location.lng();
//   //           alert("Latitude: " + latitude + "\nLongitude: " + longitude);
//   //       } else {
//   //           alert("Request failed.")
//   //       }
//   //   });
//   //   return [latitude, longitude];
//   // }