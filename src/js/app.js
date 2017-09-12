function createInfowindow(name, street, city) {
    return new google.maps.InfoWindow({
        content: '<div class="bubble"><strong>' + name + '</strong><div class="info">' + street + '<br>' + city + '</div></div>'
    });
}

var map = null;

const icon_green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
const icon_yellow = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
const icon_purple = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
const icon_red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
const icon_blue = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

const TYPE_RAMP = 0;
const TYPE_PARK = 1;
const TYPE_SPOT = 2;
const TYPE_SHOP = 3;

var markers = [];
var locations = [
    {
        title: 'Obřany - rampa',
        street: 'Černovická 568/11',
        city: '617 00 Brno-jih-Komárov',
        position: {lat: 49.226088, lng: 16.661595},
        type: TYPE_RAMP,
    },
    {
        title: 'Skatepark Juliánov',
        street: 'Líšeňská 4223/46',
        city: '636 00 Brno-Židenice',
        position: {lat:49.196835, lng:16.656936},
        type: TYPE_PARK,
    },
    {
        title: 'Skatepark Slatina',
        street: 'Rousínovská 1028/2',
        city: '627 00 Brno-Slatina',
        position: {lat:49.181990, lng:16.684940},
        type: TYPE_PARK,
    },
    {
        title: 'Skatepark Komárov',
        street: 'Hněvkovského 71/62',
        city: '617 00 Brno-jih',
        position: {lat:49.169596, lng:16.624226},
        type: TYPE_PARK,
    },
    {
        title: 'Starý skatepark Komárov',
        street: 'Černovická 568/11',
        city: '617 00 Brno-jih-Komárov',
        position: {lat:49.178233, lng:16.628310},
        type: TYPE_PARK,
    },
    {
        title: 'Spot za Lužánkami',
        street: 'Sportovní 347/2',
        city: '602 00 Brno-Královo Pole',
        position: {lat:49.211490, lng:16.608152},
        type: TYPE_SPOT,
    },
    {
        title: 'Skatepark Bohunice',
        street: 'Osová 717/20',
        city: '625 00 Brno-Bohunice',
        position: {lat:49.167178, lng:16.568799},
        type: TYPE_PARK,
    },
    {
        title: 'Minirampa na Dráze',
        street: 'Nádražní 9',
        city: '602 00 Brno-střed',
        position: {lat:49.189315, lng:16.608593},
        type: TYPE_RAMP,
    },
    {
        title: 'Schody u Janáčka',
        street: 'Sady Osvobození',
        city: '602 00 Brno-střed',
        position: {lat:49.198472, lng:16.610429},
        type: TYPE_SPOT,
    },
    // shopy
    {
        title: 'Longshop',
        street: 'Antonínská 5',
        city: '602 00 Brno-střed',
        position: {lat:49.202560, lng:16.605634},
        type: TYPE_SHOP,
    },
    {
        title: 'Nugget store na Orlí',
        street: 'Orlí 478/11',
        city: '602 00 Brno-střed',
        position: {lat:49.193476, lng:16.611045},
        type: TYPE_SHOP,
    },

    // {
    //     title: '',
    //     street: '',
    //     city: '',
    //     position:
    // },
];

var filter = [];

function removeMarkers(){
    var marker;
    for (i = 0; i < markers.length; i++){
        marker = markers[i];
        marker.setMap(null);
    }
}

function createFilter() {
    var filter = [];

    if (document.getElementById("parks-checkbox").checked)
        filter.push(TYPE_PARK);
    if (document.getElementById("shops-checkbox").checked)
        filter.push(TYPE_SHOP);
    if (document.getElementById("spots-checkbox").checked)
        filter.push(TYPE_SPOT);
    if (document.getElementById("ramps-checkbox").checked)
        filter.push(TYPE_RAMP);

    return filter;
}

function placeMarkers(locations) {
    var infowindow = null;
    markers = [];

    filter = createFilter();

    locations.filter(function(item) {
        return filter.indexOf(item.type) !== -1;
    }).forEach(function(element) {
        var icon;

        switch(element.type) {
            case TYPE_SPOT:
                icon = icon_purple;
                break;
            case TYPE_RAMP:
                icon = icon_yellow;
                break;
            case TYPE_SHOP:
                icon = icon_green;
                break;
            case TYPE_PARK:
            default:
                icon = icon_red;
                break;
        }
        var marker = new google.maps.Marker({
          position: element.position,
          map: map,
          title: element.title,
          icon: icon,
        });

        // marker.setAnimation(google.maps.Animation.BOUNCE);
        // setTimeout(function(){ marker.setAnimation(null); }, 750);

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
            if (infowindow) {
                infowindow.close();
            }
            infowindow = createInfowindow(element.title, element.street, element.city);
            infowindow.open(map, marker);
        });
    });
}

function toggleSidepanel() {
    $("#sidepanel").toggleClass("onscreen");

    // highlight filter button
    $("#toggle-sidepanel").parent().toggleClass("active");

    // collapse menu on mobile version
    if($('.navbar-toggle').css('display') !='none'){
        $('.navbar-toggle').click();
    }
}

function handleLocationError(browserHasGeolocation) {
    console.error('location error', browserHasGeolocation);
}

function initMap() {
    var brno_stred = {lat:49.194749, lng:16.609508};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: brno_stred
    });

    placeMarkers(locations);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var current_position = new google.maps.Marker({
          position: pos,
        //   position: {lat:49.1992976,lng:16.6144704},
          map: map,
          title: 'Aktuální pozice',
          icon: '/img/position.png',
        //   icon: '/img/position-small.png',
        });

        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        // map.setCenter(pos);
      }, function() {
        handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
}

$(document).ready(function() {
    $("#toggle-sidepanel").click(function(e) {
        e.preventDefault();
        toggleSidepanel();
    });

    $("#hide-filter").click(function(e) {
        e.preventDefault();
        $("#sidepanel").removeClass('onscreen');
    });

    $("#remove-markers").click(function(e) {
        e.preventDefault();
        removeMarkers();
    });
    $("#place-markers").click(function(e) {
        e.preventDefault();
        placeMarkers(locations);
    });

    $("#filter").change(function() {
        removeMarkers();
        placeMarkers(locations);
    });
});
