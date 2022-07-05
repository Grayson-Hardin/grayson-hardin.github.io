AFRAME.registerComponent('toggle-visibility', {
    schema: {
      visible: { default: false }
    },
    init: function () {
      var el = this.el;    
      var modelCoords = el.getAttribute('gps-projected-entity-place');
      var formatModelCoords = modelCoords.split(';');
      var modelLatitude = formatModelCoords[0].replace(/^\.|[^-?\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
      var modelLongitude = formatModelCoords[1].replace(/^\.|[^-?\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
  
      this.el.sceneEl.addEventListener('user-coords-update', (event) => {
          var isVisible = determineVisibility(event.detail.coords.latitude, event.detail.coords.longitude);
          if (isVisible && el.getAttribute('gltf-model') === 'assets/models/lady_bug/scene.gltf') {
            el.emit('visibility-change', true); 
            el.setAttribute('visible', true);
            console.log("Visibility is ", isVisible)
          } else {
            el.emit('visibility-change', false);
            el.setAttribute('visible', false);
            console.log("You are far away, keep looking!");
          }
      });
  
      function determineVisibility(userLatitude, userLongitude) {
        // use this for testing purposes only: can set userCoords to arbitrary values
  
        // var userLat = 41.1593361
        // var userLon = -93.5926825
        // var distanceFromObject = metersBetween(userLat, userLon, modelLatitude, modelLongitude);
        // console.log("distance between is", distanceFromObject, " meters")
  
        var distanceFromObject = metersBetween(userLatitude, userLongitude, modelLatitude, modelLongitude);
        console.log("distance between is", distanceFromObject, " meters")
        console.log("user:", userLatitude, userLongitude, "model:", modelLatitude, modelLongitude)
        return distanceFromObject <= 8;
      }
  
      // moved because it was not detecting metersBetween in the main.js file
      function metersBetween(lat1, lon1, lat2, lon2) {
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d * 1000; 
      }
    }
  });