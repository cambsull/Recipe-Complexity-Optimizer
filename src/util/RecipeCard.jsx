import React from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe, complexity, dishType, totalTime, ingredientCount }) {

  function handleButtonClick() {
    window.open(recipe.url, '_blank');
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} className="recipe-image" />
      <h2>{recipe.label}</h2>
      <div className="recipeInfoContainer">
        <p><b>Dish type</b>: {dishType}</p>
        <p><b>Ingredient count</b>: {ingredientCount}</p>
        <p><b>Time to prepare</b>: {totalTime}</p>
        <p><b>Complexity</b>: {complexity}</p>
      </div>

      <button onClick={handleButtonClick}>
        View Recipe
      </button>
    </div>
  );
}

export default RecipeCard;
