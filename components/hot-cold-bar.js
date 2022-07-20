AFRAME.registerComponent("hot-cold-bar", {
    init: function () {
      this.el.sceneEl.addEventListener("new-closest-bug", (event) => {
        var closestBug = event.detail.closestBug;
        console.log("Here: " + closestBug);
      });
    },
  });
  