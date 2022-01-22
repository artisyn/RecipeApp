'use strict';
const userInput = document.querySelector('.search--inp');

const mainDisplay = document.querySelector('.main-content');

const searchParams = function (param) {
  getRecipe(param);
};

userInput.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    mainDisplay.innerHTML = '';
    searchParams(userInput.value);
    userInput.value = '';
  }
});

const getRecipe = async function (param) {
  try {
    const fetchRecipes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`
    );
    console.log(fetchRecipes);
    if (fetchRecipes.ok !== true) throw new Error('Bad URL');

    const recipes = await fetchRecipes.json();
    console.log(recipes);
    recipes.meals.forEach((el) => {
      const content = `
        
        <div class="meal">
                        <img class="meal--img" src="${el.strMealThumb}" alt="${el.strMeal} image" />
                        <span class="meal--name">${el.strMeal}</span>
                        <span class="meal--country">${el.strArea}</span>
                        <a class="meal--link" href="${el.strSource}">Click for more info</a>
                    </div>
        
        
        
        `;
      mainDisplay.insertAdjacentHTML('beforeend', content);
    });
  } catch (err) {
    console.log(err);
  }
};
