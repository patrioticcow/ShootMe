function init() {
    document.addEventListener("deviceready", deviceReady, true);
}

function deviceReady() {

    //create the Maps-instance
    var maps = new Maps();
    var latitude = window.localStorage.getItem("latitude");
    var longitude = window.localStorage.getItem("longitude");

    var friendLatitude = window.localStorage.getItem("latitude_other");
    var friendLongitude = window.localStorage.getItem("longitude_other");

    console.log('me: ' + latitude+'-'+longitude);
    console.log('friend: ' + friendLatitude+'-'+friendLongitude);
    // paint map
    var gmap = maps.getGeoLocation('#map', 20, latitude, longitude);

    // add me
    var meMarker = maps.addMarkers(gmap, latitude, longitude);
    maps.addCircle(gmap, 20, latitude, longitude);

    // add friend
    var friendMarker = maps.addMarkers(gmap, friendLatitude, friendLongitude);
    maps.addCircle(gmap, 10, friendLatitude, friendLongitude);

    // TODO: get player
/*
    $.getJSON('json/players.json').done(function(data) {
        $.each(data, function(k,v){
            console.log(v.life);
        });
    });
*/

    // check to see if markers are inside the bounding area
    google.maps.event.addListener(gmap.map, 'idle', function(){
        var currentBounds = gmap.getBounds();
        //console.log('idle: ' + currentBounds.Z.b + ' - ' + currentBounds.ca.b);
        //console.log('idle: ' + currentBounds.Z.d + ' - ' + currentBounds.ca.d);

        var x = currentBounds.contains(meMarker.getPosition());
        var y = currentBounds.contains(friendMarker.getPosition());
        console.log(x);
        console.log(y);
    });

    // marker content
    var getTile = function(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('div');
        div.innerHTML = coord;
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.fontSize = '10';
        div.style.fontWeight = 'bolder';
        div.style.border = 'dotted 1px #aaa';
        div.style.textAlign = 'center';
        div.style.lineHeight = this.tileSize.height + 'px';
        return div;
    };

    /* adds grid on the map, not used
    gmap.addOverlayMapType({
        index: 0,
        tileSize: new google.maps.Size(256, 256),
        getTile: getTile
    });
    */

    //nothing here yet
    window.setInterval(function() {

    }, 10000);

}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});