function init() {
    document.addEventListener("deviceready", deviceReady, true);
}

var watchID = null;

function deviceReady() {
    // to do
    var options = { timeout: 10000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});

var onSuccess = function(position) {

    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    console.log('Latitude: '  + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
};

var onError = function() {
    console.log('onError!');
};