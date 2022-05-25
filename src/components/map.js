import React from 'react'
import { GoogleMap, LoadScript, Marker, Geocoder } from '@react-google-maps/api';


const containerStyle = {
  height: '80vh',
  width: '1300px'
};

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //latlng: getLatLngByZipcode(this.props.zipcode),
    }
    //this.latlng = this.getLatLngByZipcode(props.zipcode);
    this.center = {
      lat: 45,
      lng: 45
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
        <LoadScript
          googleMapsApiKey="AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho"

          //onLoad={this.getLatLngByZipcode(this.props.zipcode)}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.center}
            zoom={15}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={this.center} />
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

export default MyMap