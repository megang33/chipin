import React from 'react'
//this is a test of the github commit, push, etc.
// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

window.initMap = initMap;

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho&callback=initMap">
</script>


const map = () => {
    return (
        <div>
            <h3>Find a Map</h3>
        </div>
    )
}

export default map
