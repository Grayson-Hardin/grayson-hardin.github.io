AFRAME.registerComponent('bug-counter', {
  schema: {
    el: {
      type: 'selector'
    },
    score:{
      type: 'int',
      default: 0
    },
  },

  init: function () {
    var sceneEl = document.querySelector('a-scene'); 
    var scoreBoard = document.querySelector('#score');

    sceneEl.querySelector('a-entity').addEventListener('click', () => {
      this.data.score++;
      var newScore = 'Bugs Found: ' + this.data.score
      scoreBoard.setAttribute('text', 'value',  newScore)
    })
  }
});