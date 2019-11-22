/* eslint-env es6, browser, jquery */

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
  console.log("viewAll: Not yet implemented");
}

function petMatch() {
  question += 1;
  $('.appInitial').hide();
  $('#q1').show();
  
  $('.appQuestion').on('click', 'button', (event) => {
    
  })
}





//  $.getJSON('js/data.json', (result) => {
//    
//  })