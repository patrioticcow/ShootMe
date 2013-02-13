var Maps = (function () {

    function Maps() {
        this.getWatchCoord();
    }

    Maps.prototype.getWatchCoord = function () {
        var options = { enableHighAccuracy: true, timeout: 30000 };
        navigator.geolocation.watchPosition(this.onWatchSuccess, this.onWatchError, options);
    };

    Maps.prototype.onWatchSuccess = function (position) {
        // temporary, emulate movement
        var movement = (Math.floor(Math.random() * 5) + 1) * 0.0001;

        // add to local storage
        window.localStorage.setItem('latitude'          , position.coords.latitude );
        window.localStorage.setItem('longitude'         , position.coords.longitude );

        window.localStorage.setItem('latitude_other'          , position.coords.latitude + movement );
        window.localStorage.setItem('longitude_other'         , position.coords.longitude + movement );


        window.localStorage.setItem('altitude'          , position.coords.altitude );
        window.localStorage.setItem('accuracy'          , position.coords.accuracy );
        window.localStorage.setItem('altitudeAccuracy'  , position.coords.altitudeAccuracy );
        window.localStorage.setItem('heading'           , position.coords.heading );
        window.localStorage.setItem('speed'             , position.coords.speed );
    };

    Maps.prototype.onWatchError = function (error) {
        console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    };

    Maps.prototype.getGeoLocation = function(div, zoom, latitude, longitude) {
        return new GMaps({
            div: div,
            zoom: zoom,
            lat: latitude,
            lng: longitude
        });
    };

    Maps.prototype.addMarkers = function(gmap, latitude, longitude) {
        return gmap.addMarker({
            lat: latitude,
            lng: longitude,
            title: 'Me',
            icon: 'images/markers/m1.png',
            infoWindow: {
                content: '<p>Some Content about the player</p>'
            }
        });
    };

    Maps.prototype.addCircle = function(gmap, radius, latitude, longitude) {
        gmap.drawCircle({
            lat: latitude,
            lng: longitude,
            radius: radius,
            strokeColor: '#131540',
            strokeOpacity: 0.3,
            strokeWeight: 2
        });
    };

    return Maps;

})();