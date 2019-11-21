function viewAll() {
  console.log(true)
}

function petMatch() {
  console.log(false);
}

$('.appInitial').on('click', (event) => {
  window[event.target.attributes['data-selection'].nodeValue]();
})
