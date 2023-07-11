// Listen for DOMContentLoaded event to ensure the document has been fully loaded
document.addEventListener("DOMContentLoaded", displayFavorites);

// it will display the favorite list
function displayFavorites() {
  // Retrieve the favorite list from localStorage or initialize an empty array
  const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  const favoriteListContainer = document.getElementById("favorite-list");

  if (favoriteList.length === 0) {
    // Display a message if the favorite list is empty
    favoriteListContainer.innerHTML = "<p>No favorites added yet.</p>";
  } else {
    favoriteListContainer.innerHTML = ""; // it will clear the favorite list 

    // Iterate through each favorite meal and fetch its details
    favoriteList.forEach((meal) => {
      fetchMealDetails(meal.id)
        .then((data) => {
          // Create a favorite list item and append it to the container
          const listItem = createFavoriteListItem(data.meals[0]);
          favoriteListContainer.appendChild(listItem);
        })
        .catch((error) => {
          console.log("Error fetching meal details:", error);
        });
    });
  }
}

// Function to fetch meal details based on the meal ID
function fetchMealDetails(mealID) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  return fetch(url).then((response) => response.json());
}

// Function to create a favorite list item
function createFavoriteListItem(meal) {
  const listItem = document.createElement("li");
  listItem.classList.add("favorite-item");

  const image = document.createElement("img");
  image.src = meal.strMealThumb;
  image.alt = meal.strMeal;

  const mealDetails = document.createElement("div");
  mealDetails.classList.add("meal-details");

  const mealName = document.createElement("h3");
  mealName.textContent = meal.strMeal;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    removeFavorite(meal.id);
    listItem.remove();
  });

  mealDetails.appendChild(mealName);
  mealDetails.appendChild(removeButton);

  listItem.appendChild(image);
  listItem.appendChild(mealDetails);

  return listItem;
}

// Function to remove a favorite from the list
function removeFavorite(mealID) {
  const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  const updatedList = favoriteList.filter((meal) => meal.id !== mealID);
  localStorage.setItem("favoriteList", JSON.stringify(updatedList));
}
