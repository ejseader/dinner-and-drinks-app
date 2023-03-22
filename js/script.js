


var weather = $('.weather');
var drinkSubmitBtn = $('#drinkSubmitBtn')
var drinkResultsBox = $('#cocktailResults')
var dinnerSubmitBtn = $('#dinnerSubmitBtn')
var recipeResultsBox = $('#recipeResults')

var weatherBaseURL = 'https://api.openweathermap.org/data/2.5';
var weatherApiKey = '7712c3c6c0b9e04b01c5813d32146e7f';
var weatherURL = weatherBaseURL + '/weather?units=imperial&appid=' + weatherApiKey;

drinkSubmitBtn.click(onDrinkSubmit)
dinnerSubmitBtn.click(onDinnerSubmit)



// Weather
// getLocation();

function getLocation() {
  navigator.geolocation.getCurrentPosition(function (locationData) {
    console.log(locationData);

    $.get(weatherURL + '&lat=' + locationData.coords.latitude + '&lon=' + locationData.coords.longitude).then(function (weatherData) {
      var tempRounded = Math.round(weatherData.main.temp)
      weather.text("Today's weather is: " + tempRounded + "° with " + weatherData.weather[0].description);
    });
  });
}

// ***COCKTAIL API***

function onDrinkSubmit() {

  var drinkInput = $('#drinkInput')

  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + drinkInput.val(),
    headers: { 'X-Api-Key': 'ZopEIrMGo8DOoc0dzghX6Q==jpI6hU8jDuT9xo9m' },
    contentType: 'application/json',
    success: function (results) {
      // success playground
      var cocktail = results[0]
      var cocktailString = JSON.stringify(cocktail)
      console.log(typeof cocktailString)
      drinkResultsBox.append(cocktailString)  
      closeModal($('#drinks-modal'))
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

// onDrinkSubmit('vodka')


// ***RECIPE API***
// Full URL for reference
// See 'from=0&size=3' - this means pick an amount of meals between these two numbers (0 and 3)

// See 'q=chicken' - this is where a meal is specified (just for reference)

'https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=chicken'

const options = {
  url: 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=chicken',
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9b07acf500msh7f328162cf4918ap156118jsn6c9a77cfe2e5',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  },
  success: function (results) {
    // success playground
    // var cocktail = results[0]
    // console.log(results);
    closeModal($('#dinner-modal'))
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
  }
};
function onDinnerSubmit() {
  $.ajax(options);
}
onDinnerSubmit()





// Call this function to close the modal - pass in jquery selection
function closeModal($el) {
  $el.removeClass('is-active');
}



document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });
  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-card-head .delete, .modal-card-foot') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;
    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

