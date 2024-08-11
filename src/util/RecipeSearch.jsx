import axios from 'axios';
import { useState, useEffect } from 'react';



// Functions to call API

function RecipeSearch({query}) {
  const [recipes, setRecipes] = useState([])


  useEffect(() => {

    // Environment variable definitions
    const apiId = import.meta.env.VITE_APP_ID;
    const apiKey = import.meta.env.VITE_APP_KEY;

    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apiId}&app_key=${apiKey}`;

    axios.get(url)
      .then(response => {
        const data = response.data.hits.map(hit => hit.recipe);

        const sortedRecipes = data.sort((a, b) => {
          const complexityA = calculateComplexity(a);
          const complexityB = calculateComplexity(b);
          return complexityA - complexityB;
        });

        setRecipes(sortedRecipes);
      })
      .catch(error => {
        console.error("Axios error: ", error)
      });
  }, [query]);

  const calculateComplexity = (recipe) => {
    const ingredientCount = recipe.ingredientLines.length;
    const instructionLength = recipe.instructions ? recipe.instructions.length : 0;
    const totalTime = recipe.totalTime || 0;

    return ((ingredientCount + instructionLength / 100) + (totalTime / 10));
  }

  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index}>
            <h1>{recipe.label}</h1>
            <img src={recipe.image} alt={recipe.label} />
            <p>{recipe.source}</p>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
            <p>Estimated Complexity: {calculateComplexity(recipe)}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export { RecipeSearch };