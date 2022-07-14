AFRAME.registerComponent("change-model-on-click", {
  schema: {
    visible: {
      default: false,
    },
  },

  init: function () {
    var el = this.el;
    var defaultVisibility = el.getAttribute("visible").visible;

    el.addEventListener("click", () => {
      el.setAttribute("visible", defaultVisibility);
      el.removeAttribute("gltf-model");
      var id = el.getAttribute("id");
      setCookie(id, "squashed", 1);
      el.emit("updateScoreboard", document.cookie.split(";").length) + "/18";
      var audio = new Audio("../assets/sounds/onClickSquish.mp3");
      audio.play();
    });

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  },
});
