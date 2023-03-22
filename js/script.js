

// **COCKTAIL API - RECEIVING CORS ERROR FOR RUNNING TOO MANY TIMES**

function onDrinkSubmit(drinkName) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cocktail?name=' + drinkName,
        headers: { 'X-Api-Key': 'ZopEIrMGo8DOoc0dzghX6Q==jpI6hU8jDuT9xo9m'},
        contentType: 'application/json',
        success: function(result) {
            // success playground
            console.log(result);
            for(let i = 0; i < result.length; i++) {
                console.log(result[i].ingredients)
                for(let ingredient of ingredients) {
                    console.log(`This ingredient: ${ingredient} is for the ${result[i].name} beverage.  To make do this: ${result[i].instructions}`)
                }
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}
// onDrinkSubmit('manhattan')

// ***RECIPE API***
// Full URL for reference
// See 'from=0&size=3' - this means pick an amount of meals between these two numbers (0 and 3)

// See 'q=chicken' - this is where a meal is specified (just for reference)

'https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=chicken'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9b07acf500msh7f328162cf4918ap156118jsn6c9a77cfe2e5',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};
function getOptions () {fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=3', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}
// getOptions()





document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
    function closeModal($el) {
      $el.classList.remove('is-active');
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

