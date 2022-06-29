var watchID;
var geoLoc;
function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log("Latitude : " + latitude + " Longitude: " + longitude);
}
function errorHandler(err) {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }
function getLocationUpdate() {
    if (navigator.geolocation) {
      var options = { timeout: 1 };
      geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
      console.log(watchID)
    } else {
      alert("Sorry, browser does not support geolocation!");
    }

    getLocationUpdate();
  }
