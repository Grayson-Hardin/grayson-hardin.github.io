AFRAME.registerComponent('get-user-coords', {
  init: async function () {
    var geoLoc;
    var el = this.el;

    watchLocation();

    function watchLocation() {
      if (navigator.geolocation) {
        var options = { timeout: 1 };
        geoLoc = navigator.geolocation;
        geoLoc.watchPosition(updateLocation, errorHandler, options);
      } else {
        alert("Sorry, browser does not support geolocation!");
      }
    }

    function updateLocation(position) {
      el.emit('user-coords-update', {coords: position.coords});
    }

    function errorHandler(err) {
      if (err.code == 1) {
        alert("Error: Access is denied!");
      } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
      }
    }
  }
});