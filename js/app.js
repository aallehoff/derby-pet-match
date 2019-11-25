/* eslint-env es6, browser, jquery */

let question = 0;
let response = [];

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BEGIN .appInitial #viewAll onClick
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
$('.appInitial').on('click', '#viewAll', () => {
  // Hide .appIntial and set values for debug.
  $('.appInitial').hide();
  question = -1;
  response[question] = "viewAll";

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
  response[question] = "petMatch";
  question = 1;
  $('#q1').show();

  // BEGIN .appQuestion button onClick
  $('.appQuestion').on('click', 'button', (event) => {
    // Immediately hide question.
    $('#q' + question).hide();

    // Record values into response.
    if (event.target.attributes['data-input'] !== undefined) {
      // If data-input attribute is present...
      for (let i = 0; i < $(event.target).siblings('input').length; i++) {
        // ...for each sibling...
        if ($(event.target).siblings('input')[i].attributes['type'].nodeValue == "number") {
          // ...if input type is number, record value of input into response.
          response[question] = $($(event.target).siblings('input')[i]).val();
        } else if ($(event.target).siblings('input')[i].attributes['type'].nodeValue == "checkbox") {
          // ...else if input type is checkbox...
          if (!$.isArray(response[question])) {
            // ...create an array...
            response[question] = [];
          }
          // ...then record the value of each checked box into response.
          if ($($(event.target).siblings('input')[i]).is(':checked')) {
            response[question].push(
              $(event.target).siblings('input')[i].attributes['data-selection'].nodeValue
            );
          }
        }
      }
    } else {
      // Otherwise, record value of data-selection attribute into response.
      response[question] = event.target.attributes['data-selection'].nodeValue;
    }

    // Increment counter and display next question.
    question++;
    $('#q' + question).show();
  }) // END .appQuestion button onClick
}); // END .appInitial #petMatch onClick
