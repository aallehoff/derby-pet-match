/* eslint-env es6, browser, jquery */

let question = 0;
let answers = [];
let labels = ["function", "personality", "rooms", "yard", "presence"];

function recordAnswer(event, array, index) {
  // Record the data-selection value of this event's target to the array at index.
  if ($(event.target).attr('data-input') !== undefined) {
    // Accept INPUT elements.
    $(event.target).siblings('input').each((i, elem) => {
      if ($(elem).attr('type') == "number") {
        // Input Type: NUMBER
        array[index] = $(elem).val();
      } else if ($(elem).attr('type') == "checkbox") {
        // Input Type: CHECKBOX
        if (!$.isArray(array[index])) {
          // Create an array to store checkbox values in.
          array[index] = [];
        }
        if ($(elem).is(':checked')) {
          // Store checkbox values in array.
          array[index].push($(elem).attr('data-selection'));
        }
      }
    });
  } else {
    // Accept BUTTON elements.
    array[index] = $(event.target).attr('data-selection');
  }
} // END DEFINITION of recordAnswer

function printResults(selector, array, keys) {
  // Combine keys with array.
  let response = {};
  for (let i = 0; i < keys.length; i++) {
    response[keys[i]] = array[i];
  }

  // Fetch JSON data, compare to array, output to selector.
  $.getJSON('js/data.json', (jsonData) => {
    // Fetch data from JSON file.
    $.each(jsonData, (i, petObj) => {
      // For each object in JSON array...
      
      // Compare response to petObj if using petMatch.
      if (response['function'] == "petMatch") {
        let tolerable;
        
        $.each(response['presence'], (i, string) => {
          // Compare petObj to response and generate a score. A non-zero score indicates an undesirable match.
          let score = 0;
          if (petObj['presence'].includes(string)) {
            score += 0;
          } else {
            score++;
          }
          tolerable = !score;
        })
        
        let skip = !( // The inverse of...
                      (response['personality'] == petObj['personality']) // Matching personality.
                      && (Number(response['rooms']) >= petObj['rooms']) // Equal or more rooms.
                      && !((Boolean(response['yard']) && false) && (petObj['yard'] && true)) // Not if the applicant doesn't have a yard when the pet needs one.
                      && tolerable
                    ) // END VARIABLE skip
        if (skip) {
          // Skip to next in each loop if and only if no match.
          return true;
        }
      }

      // Template output.
      let output = `<div class="card col-12 col-md-6 col-xl-3">
                      <div class="card-body">
                        <img src="${petObj['content']['imageSrc']}" class="card-img-top" alt="${petObj['content']['name']} the ${petObj['content']['species']}">
                        <h5 class="card-title">${petObj['content']['name']}</h5>
                        ${petObj['content']['bio']}
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Species: ${petObj['content']['species']}</li>
                        <li class="list-group-item">Age: ${petObj['content']['age']}</li>
                        <li class="list-group-item">Sex: ${petObj['content']['sex']}</li>
                        <li class="list-group-item">Hair: ${petObj['content']['hair']}</li>
                        <li class="list-group-item">Coat: ${petObj['content']['coat']}</li>
                      </ul>
                    </div>`;
      
      // Append output.
      $(selector).append(output);
    }); // END $.each()
  }); // END $.getJSON()
} // END DEFINITION of printResults

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #viewAll onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$('.appInitial').on('click', '#viewAll', () => {
  $('.appInitial').hide();
  answers[question] = "viewAll";
  question = -1;

  printResults('.appOutput', answers, labels);
}); // END .appInitial #viewAll onClick

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #petMatch onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$('.appInitial').on('click', '#petMatch', () => {
  $('.appInitial').hide();
  answers[question] = "petMatch";
  question = 1;
  $('#q1').show();

  // BEGIN .appQuestion .nextQuestion onClick
  $('.appQuestion').on('click', '.nextQuestion', (event) => {
    $('#q' + question).hide();
    recordAnswer(event, answers, question);
    question++;
    $('#q' + question).show();
  }); // END .appQuestion button onClick

  //BEGIN .appQuestion .finalQuestion onClick
  $('.appQuestion').on('click', '.finalQuestion', (event) => {
    $('#q' + question).hide();
    recordAnswer(event, answers, question);
    printResults('.appOutput', answers, labels);
  }); // END .appQuestion .finalQuestion onClick
}); // END .appInitial #petMatch onClick
