AFRAME.registerComponent('change-model-on-click', {
  schema: {
    visible: { default: false }
  },

  init: function () {
    var el = this.el;
    var hover = true;
    var defaultVisibility = el.getAttribute('visible').visible;
    const listOfEmails = [];
    var userSignedUp = false

    el.addEventListener('click', async function () {
      hover = false;
      el.setAttribute('visible', defaultVisibility)
      el.removeAttribute('gltf-model')

      if (userSignedUp === false){
        validateUserInput();
      }
    });

    function validateUserInput() {
      let userPrompt = prompt("Please enter your email: ")
      // if (userPrompt == "") {
      //   alert("Field cannot be empty");
      //   validateUserInput();
      // }
      // else if (isNaN(userPrompt) === false) {
      //   alert("Field cannot be purely numeric");
      //   validateUserInput();
      // }
      if (confirm("Your email is '" + userPrompt + "' is that correct?")) {
        userSignedUp = true
        listOfEmails.push(userPrompt)
      }
    }
  }
});