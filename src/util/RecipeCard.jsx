import React from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe, complexity }) {

    function handleButtonClick() {
        window.open(recipe.url, '_blank');
    };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} className="recipe-image" />
      <h2>{recipe.label}</h2>
      <p>{recipe.source}</p>
      <p>Estimated complexity: {complexity}</p>
      <button onClick={handleButtonClick}>
        View Recipe
      </button>
    </div>
  );
}

export default RecipeCard;
