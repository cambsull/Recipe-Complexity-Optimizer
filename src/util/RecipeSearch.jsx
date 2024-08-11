import axios from 'axios';
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeSearch.css';


function RecipeSearch({ query }) {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {

    if (query) {
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

          setRecipes(sortedRecipes.slice(0, 15));
        })
        .catch(error => {
          console.error("Axios error: ", error)
        });
    }
  }, [query]);

  const calculateComplexity = (recipe) => {
    const ingredientCount = recipe.ingredientLines.length;
    const instructionLength = recipe.instructions ? recipe.instructions.length : 0;
    const totalTime = recipe.totalTime || 0;

    return ((ingredientCount + instructionLength / 100) + (totalTime / 10));
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} complexity={calculateComplexity(recipe)} />
      ))
      }
    </div>
  );
}


export { RecipeSearch };