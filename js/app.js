/* eslint-env es6, browser, jquery */

let question = 0;
let response = [];

// Wait for user input to begin.
$('.appInitial').on('click', 'button', (event) => {
  // Run the function named in button.
  window[event.target.attributes['data-selection'].nodeValue]();
})

function viewAll() {
  question = -1;
  console.log("viewAll: Not yet implemented");
}

function petMatch() {
  question += 1;
  $('.appInitial').hide();
  $('#q1').show();

  $('.appQuestion').on('click', 'button', (event) => {
    if (event.target.attributes['data-input'] !== undefined) {
      console.log("Input: Not yet implemented")
    } else {
      response[question] = event.target.attributes['data-selection'].nodeValue;
      console.log(response);
      $('#q' + question).hide();
      question++;
      $('#q' + question).show();

    }


  })
}





//  $.getJSON('js/data.json', (result) => {
//    
//  })
