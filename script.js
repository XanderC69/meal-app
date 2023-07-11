// Here I got all the DOM elements

const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementsByClassName("result-heading");
const single_meal_el = document.getElementById("single-meal");

// this is the function to handle the mealSearch
function mealSearch(e) {
  e.preventDefault(); //it will prevent default form submission behavior

  // clear single meal
  single_meal_el.innerHTML = "";

  //get search meal
  const term = search.value;

  //check for empty
  if (term.trim()) {
    //fetch data from API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search result for ${term}`;

        // check if there are no results for the meal that user searches
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There are no result for ${term} `;
          alert("No Results"); // if wrong item or anything which is not present in the API will be search then this message will pop up on the window screen
        } else {
          mealEl.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}">


                <h3>${meal.strMeal}</h3>   
                </div>
                </div>
                `
            )
            .join("");
        }
      });
  } else {
    alert("Search cannot be empty"); // if nothing is there in input ans user click on search then this message will be pop up on the browser
  }
}

function getMealById(mealID) {
  // Redirect to a new HTML page with the meal ID as a URL parameter
  window.location.href = `meal-details.html?mealID=${mealID}`;
}
// event listners
submit.addEventListener("submit", mealSearch); // mealSearch function will be call on submitting the food in search list
mealEl.addEventListener("click", (e) => {
  // by clicking on the item, new page will be open with the information of the food
  const mealInfo = e.target.closest(".meal-info");
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID); // it will call getMealById function when user clicked the meal item
  }
});
