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
  // Create a dictionary from labels and answers.
  let response = {};
  for (let i = 0; i < keys.length; i++) {
    response[keys[i]] = array[i];
    /*
      This allows us to easily access the values by name instead of by index in an array.
    */
  }

  // Fetch JSON data, find matches, and output to document.
  $.getJSON('js/data.json', (jsonData) => {
    $.each(jsonData, (i, petObj) => {
      /*
        For each object in the JSON array, we compare the object's properties to the values stored in our response dictionary to determine if there is a match. If there is a match, we fill a template and output to the document.
      */

      // If the user chooses petMatch, attempt to find matches.
      if (response['function'] == "petMatch") {
        /*
          The important difference between viewAll and petMatch is what pets we *exclude* from the resultant matches. Therefore when deciding which pets to output to the page in petMatch we only need to identify which pets need to be skipped.
        */
        
        // Compare response['presence'] and petObj['presence'] arrays.
        let tolerable;
        $.each(response['presence'], (i, string) => {
          let score = 0;
          if (petObj['presence'].includes(string)) {
            // We use an if loop here because the same functionality cannot be achieved using boolean logic alone.
            score += 0;
          } else {
            score++;
          }
          tolerable = !score;
          /*
            We exploit the fact that the inverse of a number returns a boolean to determine if there is a match. For each value stored in response['presence'], if that value does not exist in petObj we increment score and move on. A score of 0 indicates a compatible match, and we set tolerable to true. Otherwise, there is no match and tolerable is set to false.
          */
        })

        let skip = !( // The inverse of...
          (response['personality'] == petObj['personality']) // Matching personality.
          &&
          (Number(response['rooms']) >= petObj['rooms']) // Equal or more rooms.
          &&
          !((Boolean(response['yard']) && false) && (petObj['yard'] && true)) // Not if the applicant doesn't have a yard when the pet needs one.
          &&
          tolerable
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
