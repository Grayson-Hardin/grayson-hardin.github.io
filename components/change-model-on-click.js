AFRAME.registerComponent('change-model-on-click', {
  schema: {
    visible: { default: false }
  },

  init: function () {
    var el = this.el;
    var hover = true;
    var defaultVisibility = el.getAttribute('visible').visible;
    var userSignedUp = false
    const listOfEmails = [];


    el.addEventListener('click', async function () {
      // Ask, Validate, and Save Email
      if (userSignedUp == false) {
        validateUserInput();
      }

      function validateUserInput() {
        let userPrompt = prompt("Please enter your email: ")
        console.log(isNaN(userPrompt));
        if (userPrompt == "") {
          alert("Field cannot be empty");
          validateUserInput();
        }
        else if (isNaN(userPrompt) === false) {
          alert("Field cannot be purely numeric");
          validateUserInput();
        }
        else if (confirm("Your email is '" + userPrompt + "' is that correct?")) {
          userSignedUp = true
          listOfEmails.push(userPrompt)
          console.log(listOfEmails)
        }
      }

      hover = false;
      el.setAttribute('visible', defaultVisibility)
      el.removeAttribute('gltf-model')
    });
  }
});