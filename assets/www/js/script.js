function init() {
    document.addEventListener("deviceready", deviceReady, true);
}

var watchID = null;

function deviceReady() {
    // to do
    var maps = new Maps();
    maps.initialize();

    window.setTimeout(function() {
        maps.changePosition();
    }, 3000);
}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});