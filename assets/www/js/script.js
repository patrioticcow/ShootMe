function init() {
    document.addEventListener("deviceready", deviceReady, true);
}

var watchID = null;

function deviceReady() {

    //create the Maps-instance
    var maps = new Maps();
    var latitude = window.localStorage.getItem("latitude");
    var longitude = window.localStorage.getItem("longitude");
    var friendLatitude = window.localStorage.getItem("latitude_other");
    var friendLongitude = window.localStorage.getItem("longitude_other");

    //initialize maps
    maps.initialize(latitude, longitude, 20, 'map_canvas');

    //add a marker
    var marker = maps.addMarker(latitude, longitude, 'me', true, 'images/markers/m1.png');
    var friendMarker = maps.addMarker(friendLatitude, friendLongitude, 'friend', false, 'images/markers/m2.png');

    //radius
    var radMe = 0.010 * 1600; // miles in meters
    var radFriend = 0.003 * 1600; // miles in meters
    maps.addCircle(marker, radMe, latitude, longitude, function(rad){
        console.log('rad ' + rad);
    });

    maps.addCircle(friendMarker, radFriend, friendLatitude, friendLongitude, function(rad){
        console.log('rad ' + rad);
    });

    //change position of marker
    window.setInterval(function() {

        var latitude = window.localStorage.getItem("latitude");
        var longitude = window.localStorage.getItem("longitude");
        var friendLatitude = window.localStorage.getItem("latitude_other");
        var friendLongitude = window.localStorage.getItem("longitude_other");

        maps.changePosition(marker, latitude, longitude, true, function(lat, long){
            console.log('position changed to ' + lat + " " + long);
        });

        maps.changePosition(friendMarker, friendLatitude, friendLongitude, false, function(lat, long){
            console.log('friend position changed to ' + lat + " " + long);
        });

    }, 10000);

}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});