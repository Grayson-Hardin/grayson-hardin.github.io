AFRAME.registerComponent('change-model-on-click', {
    schema: {
      visible: { default: false }
    },
  
    init: function () {
      var el = this.el;
      var hover = true;
      var defaultVisibility = el.getAttribute('visible').visible;
  
      el.addEventListener('click', async function () {
        console.log("Clicked!")
  
        // Shrink animation
        let scale = el.getAttribute('scale');
        console.log(el.getAttribute('gltf-model'))
        console.log(el.getAttribute('position'))
  
        while (scale.x > 0.10 && el.getAttribute('gltf-model') === 'assets/models/lady_bug/scene.gltf') {
          console.log(scale);
          scale.x = scale.x - .01;
          scale.y = scale.y - .01;
          scale.z = scale.z - .01;
          await new Promise(r => setTimeout(r, 50));
        }
  
        // Change model
        hover = false;
        el.setAttribute('visible', defaultVisibility)
        el.removeAttribute('gltf-model')
        el.setAttribute('gltf-model', "#squashed_lady_bug")
        el.setAttribute('scale', '.5 .5 .5')
      });
    }
  });