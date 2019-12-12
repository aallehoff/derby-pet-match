/* eslint-env es6, browser, jquery */

let question = 0;
let answers = [];
let labels = ["function", "personality", "rooms", "yard", "presence"];


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN recordAnswer()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function recordAnswer(event, array, index) {
  // Takes a value from an event and inserts it into an array at an index.
  if ($(event.target).attr('data-input') !== undefined) {
    /*
      If the target <button> of the event has the custom 'data-input' attribute then the data needed is contained in a sibling <input>. This means we need to look for siblings to extract the data from.
    */
    $(event.target).siblings('div').children('input').each((i, elem) => {
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
} // END recordAnswer()

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN printResults()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
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
        let presenceMatch;
        if (response['presence'].length < 1) {
          // Handle case where user checks no boxes in q4.
          presenceMatch = true;
        } else {
          $.each(response['presence'], (i, string) => {
            let score = 0;
            if (petObj['presence'].includes(string)) {
              // We use an if loop here because the same functionality cannot be achieved using boolean logic alone.
              score += 0;
            } else {
              score++;
            }
            presenceMatch = !score;
            /*
              We exploit the fact that the inverse of a number returns a boolean to determine if there is a match. For each value stored in response['presence'], if that value does not exist in petObj we increment score and move on. A score of 0 indicates a compatible match, and we set presenceMatch to true. Otherwise, there is no match and presenceMatch is set to false.
            */
          });
        }

        // Determine whether we need to skip this object in the array.
        let skip = !(
          (response['personality'] == petObj['personality'])
          && (Number(response['rooms']) >= petObj['rooms'])
          && !((Boolean(response['yard']) == false) && (petObj['yard'] == true))
          && presenceMatch
          /*
            Most of the process of determining if we need to skip can be accomplished using boolean logic. For the one part that cannot, we use a seperate function to store a boolean in the presenceMatch variable so that it may be compared against.
          */
        )

        if (skip) {
          // Skip to next in each loop if and only if no match.
          return true;
          /*
            The $.each() loop that contains this block of code listens for returned values. Returning true causes the loop to skip to the next item in the loop (same as continue). Returning false would halt execution of the loop entirely (same as break).
          */
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
                        <li class="list-group-item"><span class="badge badge-dark">Species</span> ${petObj['content']['species']}</li>
                        <li class="list-group-item"><span class="badge badge-dark">Age</span> ${petObj['content']['age']}</li>
                        <li class="list-group-item"><span class="badge badge-dark">Sex</span> ${petObj['content']['sex']}</li>
                        <li class="list-group-item"><span class="badge badge-dark">Hair Length</span> ${petObj['content']['hair']}</li>
                        <li class="list-group-item"><span class="badge badge-dark">Coat Pattern</span> ${petObj['content']['coat']}</li>
                      </ul>
                    </div>`;

      // Append output.
      $(selector).append(output);
    }); // END $.each()
  }); // END $.getJSON()
} // END printResults()

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #viewAll onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*
  This event handler calls printResults() with arguments that will cause all pets to be printed to the document.
*/
$('.appInitial').on('click', '#viewAll', () => {
  $('.appInitial').hide();
  answers[question] = "viewAll";
  question = -1;

  printResults('.appOutput', answers, labels);
}); // END .appInitial #viewAll onClick

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #petMatch onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*
  These event handlers initialize variables, record input, and call printResults() in such a way that only pets that match the user input will be printed to the document.
*/
$('.appInitial').on('click', '#petMatch', () => {
  // Initialize for petMatch routine, and define handlers for accepting input and printing results.
  $('.appInitial').hide();
  answers[question] = "petMatch";
  question = 1;
  $('#q1').show();

  // BEGIN .appQuestion .nextQuestion onClick
  $('.appQuestion').on('click', '.nextQuestion', (event) => {
    // Record user's input.
    $('#q' + question).hide();
    recordAnswer(event, answers, question);
    question++;
    $('#q' + question).show();
  }); // END .appQuestion button onClick

  //BEGIN .appQuestion .finalQuestion onClick
  $('.appQuestion').on('click', '.finalQuestion', (event) => {
    // Print results of matching to page.
    $('#q' + question).hide();
    recordAnswer(event, answers, question);
    printResults('.appOutput', answers, labels);
  }); // END .appQuestion .finalQuestion onClick
}); // END .appInitial #petMatch onClick

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN #rooms onInput
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$('#roomsNumber').on('input', (event) => {
  /* Disable the proceed button if an invalid number is entered. */
  if ($(event.target).val() < 1) {
    $('#roomsButton').prop('disabled', true);
  } else {
    $('#roomsButton').prop('disabled', false);
  }
});
