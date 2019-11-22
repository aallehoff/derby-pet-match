let question = 0;
let response = {
  "personality": "",
  "rooms": 0,
  "yard": false,
  "has": []
};

// Wait for user input to begin.
$('.appInitial').on('click', 'button', (event) => {
  // Run the function named in button.
  window[event.target.attributes['data-selection'].nodeValue]();
})

function viewAll() {
  console.log(true)
}

function petMatch() {
  console.log(false);
}




let pets;

$(document).ready(function() {
console.log(pets)
  $.getJSON('js/data.json', (result) => {
    console.log(result);
    console.log('in ' + result);
    pets = result;
  }).done((result) => {
    console.log('done ' + result)
  })

  console.log('after ' + pets);
});
