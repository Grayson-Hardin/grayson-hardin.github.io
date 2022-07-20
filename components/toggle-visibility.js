AFRAME.registerComponent("toggle-visibility", {
  schema: {
    visible: { default: false },
  },
  init: function () {
    var el = this.el;
    var modelCoords = el.getAttribute("gps-projected-entity-place");
    var formatModelCoords = modelCoords.split(";");
    var modelLatitude = formatModelCoords[0].replace(/^\.|[^-?\d\.]|\.(?=.*\.)|^0+(?=\d)/g, "");
    var modelLongitude = formatModelCoords[1].replace(/^\.|[^-?\d\.]|\.(?=.*\.)|^0+(?=\d)/g, "");

    this.el.sceneEl.addEventListener("user-coords-update", (event) => {
      var isVisible = determineVisibility(el, event.detail.coords.latitude, event.detail.coords.longitude);

      if (isVisible) {
        el.emit("visibility-change", true);
        el.setAttribute("visible", true);

      } else {
        el.emit("visibility-change", false);
        el.setAttribute("visible", false);
   
      }
    });

    function determineVisibility(element, userLatitude, userLongitude) {
      var distanceFromObject = metersBetween(userLatitude, userLongitude, modelLatitude, modelLongitude);
      console.log("User Coords: " + userLatitude + " " + userLongitude);
      // console.log(
      //   `Distance between #${element.id} and camera is ${distanceFromObject} meters\n\tUser: ${userLatitude}, ${userLongitude}\n\tModel: ${modelLatitude}, ${modelLongitude}`
      // );

      // Determine closest non-squished bug
      var x = closestBug.distance.toString();
      if (distanceFromObject < 5) {
        document.getElementById("closestBug").innerHTML = "In range! SQUASH!";
      }
      if (distanceFromObject < 100) {
        if (closestBug.id === "" && isNotSquashed()) {
          closestBug.id = element.id;
          closestBug.distance = distanceFromObject;
          element.emit("new-closest-bug", closestBug);
          document.getElementById("closestBug").innerHTML = "Closest Bug: " + x.slice(0, 6);
        } else if (distanceFromObject < closestBug.distance && isNotSquashed()) {
          closestBug.id = element.id;
          closestBug.distance = distanceFromObject;
          element.emit("new-closest-bug", closestBug);
          document.getElementById("closestBug").innerHTML = "Closest Bug: " + x.slice(0, 6);
        }
      }

      // var el = document.getElementById("header");
      // console.log(closestBug.distance);
      // if (closestBug.distance < 20) {
      //   el.style.backgroundColor = "red";
      // } else {
      //   el.style.backgroundColor = "white";
      // }

      const maximumDistance = 50;

      const scale = resizeAccordingToDistanceFromBug(distanceFromObject, maximumDistance);
      element.setAttribute("scale", scale);
      // console.log(`Setting scale of #${element.id} to "${scale}"`);

      return distanceFromObject < maximumDistance;
    }

    function isNotSquashed() {
      var cookies = document.cookie.split(";");
      cookies.map((cookie) => {
        if (cookie.id === closestBug.id) {
          closestBug = {
            id: "",
            distance: "",
          };
          el.setAttribute("visible", false);
          return false;
        }
      });
      return true;
    }

    // moved because it was not detecting metersBetween in the main.js file
    function metersBetween(lat1, lon1, lat2, lon2) {
      var R = 6378.137; // Radius of earth in KM
      var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
      var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d * 1000;
    }
  },
});

var closestBug = {
  id: "",
  distance: "",
};

function resizeAccordingToDistanceFromBug(distanceFromObject, maximumDistance) {
  const maximumScale = 0.5;
  const minimumScale = 0.1;

  const scaleRange = maximumScale - minimumScale;

  const percentOfRange = 1 - distanceFromObject / maximumDistance;

  const scaleFactor = (minimumScale + scaleRange * percentOfRange).toFixed(2);

  const scale = `${scaleFactor} ${scaleFactor} ${scaleFactor}`;

  //  console.log(`Distance: ${distanceFromObject}\n
  //     Maximum Distance: ${maximumDistance}\n
  //     Scale Range: ${scaleRange}\n
  //     Percent of Range: ${percentOfRange}\n
  //     Scale Factor: ${scaleFactor}`);
  return scale;
}
