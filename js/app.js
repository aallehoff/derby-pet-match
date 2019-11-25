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
  $('.appInitial').hide();
  response[question] = "petMatch";
  question += 1;
  $('#q1').show();
  
function nextQuestion() {
  console.log(response);
      $('#q' + question).hide();
      question++;
      $('#q' + question).show();
}

  $('.appQuestion').on('click', 'button', (event) => {
    if (event.target.attributes['data-input'] !== undefined) {
      //      console.log("Input: Not yet implemented")
      for (let i = 0; i < $(event.target).siblings('input').length; i++) {
        if ($(event.target).siblings('input')[i].attributes['type'].nodeValue == "number") {
          response[question] = $($(event.target).siblings('input')[i]).val();
          nextQuestion();
        } else if ($(event.target).siblings('input')[i].attributes['type'].nodeValue == "checkbox") {
          console.log('Checkbox: not yet implemented');
        }
      }
    } else {
      response[question] = event.target.attributes['data-selection'].nodeValue;
      nextQuestion()

    }


  })
}





//  $.getJSON('js/data.json', (result) => {
//    
//  })
