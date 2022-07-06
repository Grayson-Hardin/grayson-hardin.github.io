AFRAME.registerComponent('listener', {
    init: function () {
      this.el.addEventListener('click', evt => {
        if (evt.target.dataset.wasClicked) { return; }
        // evt.target tells you which was clicked.
        evt.target.dataset.wasClicked = true;
        // Score up.
      });
    }
  });