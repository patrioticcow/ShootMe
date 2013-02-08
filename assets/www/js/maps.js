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

    Maps.prototype.initialize = function (latitude, longitude, z, o) {

        this.center    = new google.maps.LatLng(latitude, longitude);
        this.zoom      = z;
        this.node      = document.getElementById(o);
        this.markers   = [];

        var mapOptions = {
            zoom:       this.zoom,
            center:     this.center,
            mapTypeId:  google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.node,  mapOptions);

        return this;
    };

    Maps.prototype.addMarker = function(latitude, longitude, t, c, markerImage){

        var image = new google.maps.MarkerImage(markerImage,
            new google.maps.Size(53, 52)
        );

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: this.map,
            title: t || 'Click to zoom',
            icon: image
        });

        this.markers.push(marker);

        if(c){
            this.map.setCenter(marker.getPosition());
        }
        return marker;
    }

    Maps.prototype.addCircle = function(marker, rad, latitude, longitude, f) {

        this.center    = new google.maps.LatLng(latitude, longitude);

        var circle = new google.maps.Circle({
            center: this.center,
            radius: rad,
            strokeColor: "#FF0000",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
            map: this.map
        });

        circle.bindTo('center', marker, 'position');

        // run callback
        if(f){
            f(rad);
        }
    };

    Maps.prototype.changePosition = function (marker, lat, long, c, f) {
        var latLng = new google.maps.LatLng(lat, long);

        marker.setPosition(latLng);

        if(c){
            this.map.setCenter(latLng);
        }

        // run callback
        if(f){
            f(lat, long);
        }
    }

    return Maps;

})();