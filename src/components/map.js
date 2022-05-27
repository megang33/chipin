import React from 'react'
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";


const containerStyle = {
  height: '80vh',
  width: '1300px'
};

Geocode.setApiKey("AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho");
Geocode.setRegion("en");
//Geocode.setLocationType("ROOFTOP");
//Geocode.enableDebug();


class MyMap extends React.Component {
  constructor(props) {
    super(props);
    var center;
    Geocode.fromAddress(props.zipcode).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        console.log(lat, lng);
        console.log(typeof lat);
        center = {lat: lat, lng: lng}
      },
      (error) => {console.error(error)}
    )
    this.state = {
      center: center
    }
  }

  // getLatLngByZipcode(zipcode) {
  //   console.log("Zipcode: ", zipcode);
  //   var latitude;
  //   var longitude;
  //   var geocoder = new window.google.maps.Geocoder();
  //   var address = zipcode;
  //   geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
  //       if (status === window.google.maps.GeocoderStatus.OK) {
  //           latitude = results[0].geometry.location.lat();
  //           longitude = results[0].geometry.location.lng();
  //           alert("Latitude: " + latitude + "\nLongitude: " + longitude);
  //       } else {
  //           alert("Request failed.")
  //       }
  //   });
  //   return [latitude, longitude];
  // }



  render() {
    return (
      <div>
        <LoadScriptNext
          googleMapsApiKey="AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.state.center}
            //zoom={15}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={this.state.center} />
          </GoogleMap>
        </LoadScriptNext>
      </div>
    )
  }
}

export default MyMap