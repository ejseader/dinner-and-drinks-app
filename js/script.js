


var weather = $('.weather');
var drinkSubmitBtn = $('#drinkSubmitBtn');
var dinnerSubmitBtn = $('#dinnerSubmitBtn');
var drinkName = $('#drinkName');
var drinkIngredientsList = $('#drinkIngredients');
var drinkInstructions = $('.instDrinkText');

var recipeName = $('#dinnerName');
var recipeServ = $('#recipeServ');
var recipeIngr = $('#dinnerIngredients');
var recipeInst = $('.instDinnerText');

var weatherBaseURL = 'https://api.openweathermap.org/data/2.5';
var weatherApiKey = '7712c3c6c0b9e04b01c5813d32146e7f';
var weatherURL = weatherBaseURL + '/weather?units=imperial&appid=' + weatherApiKey;

drinkSubmitBtn.click(onDrinkSubmit);
dinnerSubmitBtn.click(onDinnerSubmit);

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

  var drinkInput = $('#drinkInput')

  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + drinkInput.val(),
    headers: { 'X-Api-Key': 'ZopEIrMGo8DOoc0dzghX6Q==jpI6hU8jDuT9xo9m' },
    contentType: 'application/json',
    success: function (results) {
      // success playground
      var cocktailName = results[0].name
      drinkName.html(cocktailName)

      var drinkIngredients = results[0].ingredients

      for (i = 0; i < drinkIngredients.length; i++) {
        var drinkIngredients = results[0].ingredients
        var listItem = document.createElement('li')
        listItem.innerText = drinkIngredients[i]
        drinkIngredientsList.html(listItem)
      }
      drinkIngredientsList.html(drinkIngredients)


      var drinkInstructionsList = results[0].instructions
      drinkInstructions.html(drinkInstructionsList)


      closeModal($('#drinks-modal'))
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}


// ***RECIPE API SECTION***
// ***API-Ninja Keys:***
// Greg: ZopEIrMGo8DOoc0dzghX6Q==jpI6hU8jDuT9xo9m
// Eric: zRFOzxWuu7M0B3oR2rtqaw==P5cL6IuV6F939Tgu


// ***API-NINJA RECIPE API***


// API Keys:
// 1) bN+sDFJvoCYHzRK0Cp/dRQ==Nzbwiyafh5qDc7a5
// 2) zRFOzxWuu7M0B3oR2rtqaw==P5cL6IuV6F939Tgu
// 3) oJjHDiFtEw5ukfRj94VpvQ==dA9RS7dNApbhpGyz

function onDinnerSubmit() {

  var dinnerInput = $('#dinnerInput')

  $.get({
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + dinnerInput.val(),
    headers: { 'X-Api-Key': 'oJjHDiFtEw5ukfRj94VpvQ==dA9RS7dNApbhpGyz' },
    contentType: 'application/json',
    success: function (result) {

      var i = Math.floor(Math.random()*result.length) // array is length 10 => 0.00000001 * 10 => 0, .999999999 * 10 => 9.9999 => 9 =>array[9]
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

// ***API-NINJA RECIPE API*** 






// ***SPOONACULAR RECIPE API #1 (NOT WORKING)***

// function onDinnerSubmit() {

// var dinnerInput = $('#dinnerInput')

// var recipeURL = 'https://api.spoonacular.com/recipes/findByIngredient?apiKey=65fb1188c0fb4272ba2d1aa2627f7a0a'

// $.get(recipeURL + '&ingredients=' + dinnerInput.val()).then(function (dinnerData) {
//   console.log(dinnerData)
// });

// $.ajax({
//   method: 'GET',
//   url: 'https://api.spoonacular.com/recipes/findByIngredient?' + dinnerInput.val(),
//   headers: { 'X-Api-Key': '65fb1188c0fb4272ba2d1aa2627f7a0a' },
//   contentType: 'application/json',
//   success: function (result) {

//     console.log(result)

// var recipeTitle = result[0].title
// recipeName.html(recipeTitle)

// var recipeServings = result[0].servings
// recipeServ.html(recipeServings)

// var recipeIngredients = result[0].ingredients
// recipeIngr.html(recipeIngredients)

// var recipeInstructions = result[0].instructions
// recipeInst.html(recipeInstructions)


//       closeModal($('#dinner-modal'))
//     },
//     error: function ajaxError(jqXHR) {
//       console.error('Error: ', jqXHR.responseText);
//     }
//   });
// }

// ***SPOONACULAR RECIPE API #1 (NOT WORKING)****






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






// function onDinnerSubmit() {
// var recipeURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=0a4436b4&app_key=%2076676d75f57cdb3025779cce710a427b%09';
// $.get(recipeURL + '&q=' + dinnerInput.val()).then(function (dinnerData) {
// console.log(dinnerData);
// })
// }



// ingredientLines = ingredients (separate lines)
// yield = amount of servings
// label = name of recipe





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

