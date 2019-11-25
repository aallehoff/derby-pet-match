/* eslint-env es6, browser, jquery */

let question = 0;
let answers = [];

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #viewAll onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$('.appInitial').on('click', '#viewAll', () => {
  // Hide .appIntial and set values for debug.
  $('.appInitial').hide();
  question = -1;
  answers[question] = "viewAll";

  // Fetch JSON data and print it to div.appOutput.
  $.getJSON('js/data.json', (jsonData) => {
    // Perform action on each object in the asynchronously returned array.
    $.each(jsonData, (i, petObj) => {
      // Template output.
      let output = `<div class="card">
                      <div class="card-body">
                        <img src="${petObj['content']['imgSrc']}" class="card-img-top" alt="${petObj['content']['name']} the ${petObj['content']['description']} ${petObj['content']['species']}">
                        <h5 class="card-title">${petObj['content']['name']}</h5>
                        ${petObj['content']['biography']}
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Species: ${petObj['content']['species']}</li>
                        <li class="list-group-item">Age: ${petObj['content']['age']}</li>
                        <li class="list-group-item">Sex: ${petObj['content']['sex']}</li>
                      </ul>
                    </div>`;
      // Append output.
      $('.appOutput').append(output);

    });
  })
}); // END .appInitial #viewAll onClick

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #petMatch onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$('.appInitial').on('click', '#petMatch', () => {
  //Hide .appInitial and set values to start questions.
  $('.appInitial').hide();
  answers[question] = "petMatch";
  question = 1;
  $('#q1').show();

  // BEGIN .appQuestion button onClick
  $('.appQuestion').on('click', 'button', (event) => {
    // Immediately hide question.
    $('#q' + question).hide();

    // Record answer for current question.
    if ($(event.target).attr('data-input') !== undefined) {
      // Accept data-selection from input elements.
      $(event.target).siblings('input').each((i, e) => {
        if ($(e).attr('type') == "number") {
          answers[question] = $(e).val();
        } else if ($(e).attr('type') == "checkbox") {
          if (!$.isArray(answers[question])) {
            // Create an array to store checkbox values in.
            answers[question] = [];
          }
          if ($(e).is(':checked')) {
            // Store checkbox values in array.
            answers[question].push($(e).attr('data-selection'))
          }
        }
      });
    } else {
      // Accept data-selection for button elements.
      answers[question] = $(event.target).attr('data-selection');
    }

    // Increment counter and display next question.
    question++;
    $('#q' + question).show();
  }); // END .appQuestion button onClick
}); // END .appInitial #petMatch onClick
