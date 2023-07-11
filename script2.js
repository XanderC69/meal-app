// Retrieve the meal ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const mealID = urlParams.get("mealID");

// Get the favorite button element
const favoriteButton = document.getElementById("favorite-button");
favoriteButton.addEventListener("click", addToFavorites);

// Fetch and display the meal details based on the meal ID
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then((res) => res.json())
  .then((data) => {
    const meal = data.meals[0]; // Access the first meal in the `meals` array
    const mealDetailsContainer = document.getElementById("meal-details");

    // Create the HTML structure to display the meal details, including the ingredients
    const html = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <p>${meal.strCategory}</p>
      <p>${meal.strArea}</p>
      <h3>Ingredients</h3>
      <ul>
        ${getIngredientsHTML(meal)}
      </ul>
      <p>${meal.strInstructions}</p>
      <!-- Add additional details as needed -->
    `;

    // Insert the HTML into the container
    mealDetailsContainer.innerHTML = html;
  });

// Helper function to generate the HTML for the ingredients
function getIngredientsHTML(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`<li>${ingredient} - ${measure}</li>`);
    }
  }
  return ingredients.join("");
}

// Function to handle adding the meal to favorites
function addToFavorites() {
  // Get the existing favorite list from local storage or initialize an empty array
  const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];

  // Check if the meal is already in the favorite list
  const existingFavorite = favoriteList.find((meal) => meal.id === mealID);

  if (existingFavorite) {
    // If the meal is already in the favorite list, show an alert or handle accordingly
    alert("This meal is already in your favorites!");
  } else {
    // If the meal is not in the favorite list, add it
    favoriteList.push({ id: mealID, date: new Date() });
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    alert("Added to favorites!");

    window.location.href = "favourite.html"; // Redirect to the favorite.html page after adding the item to the favorite list
  }
}

