console.log "CoffeeScript is OK"

$(document).ready ->
    console.log "jQuery is working"

initMap = () ->
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
    })
    console.log "Map function triggered"

console.log "Map function loaded"
