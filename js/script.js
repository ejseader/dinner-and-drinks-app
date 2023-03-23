


var weather = $('.weather');
var drinkSubmitBtn = $('#drinkSubmitBtn');
var dinnerSubmitBtn = $('#dinnerSubmitBtn');
var drinkName = $('#drinkName');
var drinkIngredientsList = $('#drinkIngredients');
var drinkInstructions = $('.instDrinkText');

var drinkInput = $('#drinkInput');
var dinnerInput = $('#dinnerInput');

var recipeName = $('#dinnerName');
var recipeServ = $('#recipeServ');
var recipeIngr = $('#dinnerIngredients');
var recipeInst = $('.instDinnerText');

var weatherBaseURL = 'https://api.openweathermap.org/data/2.5';
var weatherApiKey = '7712c3c6c0b9e04b01c5813d32146e7f';
var weatherURL = weatherBaseURL + '/weather?units=imperial&appid=' + weatherApiKey;

// drinkSubmitBtn.click(onDrinkSubmit);
// dinnerSubmitBtn.click(onDinnerSubmit);

drinkSubmitBtn.click(function () {
  onDrinkSubmit();
  addDrinkSearch(drinkInput.val());
})

dinnerSubmitBtn.click(function () {
  onDinnerSubmit();
  addDinnerSearch(dinnerInput.val());
})


// Weather
getLocation();

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


  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + drinkInput.val(),
    headers: { 'X-Api-Key': 'ZopEIrMGo8DOoc0dzghX6Q==jpI6hU8jDuT9xo9m' },
    contentType: 'application/json',
    success: function (results) {
      // success playground

      var i = Math.floor(Math.random() * results.length)

      var cocktailName = results[i].name
      drinkName.html(cocktailName)

      var drinkIngredients = results[i].ingredients
      drinkIngredientsList.html(drinkIngredients)

      var drinkInstructionsList = results[i].instructions
      drinkInstructions.html(drinkInstructionsList)

      closeModal($('#drinks-modal'))
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

// ***API-NINJA RECIPE API***

// Additional API Keys:
// 1) bN+sDFJvoCYHzRK0Cp/dRQ==Nzbwiyafh5qDc7a5
// 2) zRFOzxWuu7M0B3oR2rtqaw==P5cL6IuV6F939Tgu
// 3) oJjHDiFtEw5ukfRj94VpvQ==dA9RS7dNApbhpGyz
// 4) ZopEIrMGo8DOoc0dzghX6Q==jpI6hU8jDuT9xo9m

function onDinnerSubmit() {

  $.get({
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + dinnerInput.val(),
    headers: { 'X-Api-Key': 'oJjHDiFtEw5ukfRj94VpvQ==dA9RS7dNApbhpGyz' },
    contentType: 'application/json',
    success: function (result) {

      var i = Math.floor(Math.random() * result.length) // array is length 10 => 0.00000001 * 10 => 0, .999999999 * 10 => 9.9999 => 9 =>array[9]
      console.log(i);
      console.log(result[i]);
      var recipeTitle = result[i].title
      recipeName.html(recipeTitle)

      var recipeServings = result[i].servings
      recipeServ.html(recipeServings)

      var recipeIngredients = result[i].ingredients
      recipeIngr.html(recipeIngredients)

      var recipeInstructions = result[i].instructions
      recipeInst.html(recipeInstructions)

      closeModal($('#dinner-modal'))
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

function addDrinkSearch(drinkSearch) {
  var drinkHistory = savedDrinkSearch();

  if (!drinkHistory.includes(drinkSearch)) {
    drinkHistory.push(drinkSearch)

    localStorage.setItem("drinkHistory", JSON.stringify(drinkHistory));
    console.log(drinkHistory)
  }
}

function savedDrinkSearch() {
  return JSON.parse(localStorage.getItem('drinkHistory')) || [];
}


function addDinnerSearch(dinnerSearch) {
  var dinnerHistory = savedDinnerSearch();

  if (!dinnerHistory.includes(dinnerSearch)) {
    dinnerHistory.push(dinnerSearch)

    localStorage.setItem("dinnerHistory", JSON.stringify(dinnerHistory));
    console.log(dinnerHistory)
  }
}

function savedDinnerSearch() {
  return JSON.parse(localStorage.getItem('dinnerHistory')) || [];
}

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












// ***SPOONACULAR RECIPE API #2 (WORKING)***

// function onDinnerSubmit() {

// var dinnerInput = $('#dinnerInput')

//   const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + dinnerInput.val() + "&number=3&ignorePantry=true&ranking=1",
//     "method": "GET",
//     "headers": {
//       "X-RapidAPI-Key": "c0f941e840msh245aee4ce120b12p1c810ajsn79c3d98fdcb3",
//       "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
//     }
//   };

//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });
// }

// ***SPOONACULAR RECIPE API #2 (WORKING)***