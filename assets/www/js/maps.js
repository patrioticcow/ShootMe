var Maps = (function () {

    function Maps() {
        this.getWatchCoord();
    }

    Maps.prototype.getWatchCoord = function () {
        var options = { enableHighAccuracy: true, timeout: 4000 };
        navigator.geolocation.watchPosition(this.onWatchSuccess, this.onWatchError, options);
    };


    Maps.prototype.onWatchSuccess = function (position) {
        // temporary, emulate movement
        var movement = Math.floor(Math.random() * 9) + 1;

        // add to local storage
        window.localStorage.setItem('latitude'          , position.coords.latitude + movement );
        window.localStorage.setItem('longitude'         , position.coords.longitude + movement );
        window.localStorage.setItem('altitude'          , position.coords.altitude );
        window.localStorage.setItem('accuracy'          , position.coords.accuracy );
        window.localStorage.setItem('altitudeAccuracy'  , position.coords.altitudeAccuracy );
        window.localStorage.setItem('heading'           , position.coords.heading );
        window.localStorage.setItem('speed'             , position.coords.speed );
    };

    Maps.prototype.onWatchError = function (error) {
        console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    };


    Maps.prototype.initialize = function () {
        var latitude = window.localStorage.getItem("latitude");
        var longitude = window.localStorage.getItem("longitude");

        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'),  mapOptions);

        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: 'Click to zoom'
        });

        return marker;

        // 10 seconds after the center of the map has changed, pan back to the marker.
        /*
        google.maps.event.addListener(map, 'center_changed', function() {
            window.setTimeout(function() {
                map.panTo(marker.getPosition());
            }, 10000);
        });
        */
    };

    Maps.prototype.changePosition = function () {

        var latitude = window.localStorage.getItem("latitude");
        var longitude = window.localStorage.getItem("longitude");

        var map = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(map);
    }

    return Maps;

})();