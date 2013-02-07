function init() {
    document.addEventListener("deviceready", deviceReady, true);
}

function deviceReady() {
    // to do
}

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});