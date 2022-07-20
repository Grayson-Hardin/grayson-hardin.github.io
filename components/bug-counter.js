AFRAME.registerComponent("bug-counter", {
  schema: {
    el: {
      type: "selector",
    },
    score: {
      type: "int",
      default: 0,
    },
  },

  init: function () {
    var sceneEl = document.querySelector("a-scene");
    var scoreBoard = document.querySelector("#score");

    sceneEl.querySelector("a-entity").addEventListener("click", () => {
      var cookies = document.cookie.split(";");
      this.data.score = cookies.length;
      var newScore = "" + this.data.score + "/18";
      scoreBoard.setAttribute("text", "value", newScore);
    });

    sceneEl.addEventListener("updateScoreboard", (event) => {
      var cookies = document.cookie.split(";");
      if (document.cookie === "") {
        scoreBoard.setAttribute("text", "value", "0/18");
      } else {
        this.data.score = cookies.length;
        var newScore = "" + this.data.score + "/18";
      }
      document.getElementById("score").innerHTML = newScore
      // scoreBoard.setAttribute("text", "value", newScore);
    });
  },
});
