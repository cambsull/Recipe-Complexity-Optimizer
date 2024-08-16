import axios from 'axios';
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeSearch.css';

function RecipeSearch({ query }) {
  const [recipes, setRecipes] = useState([]);
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    if (query) {
      const appId = import.meta.env.VITE_APP_ID;
      const appKey = import.meta.env.VITE_APP_KEY;

      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

      axios.get(url)
        .then(response => {
          const data = response.data.hits
            .map(hit => hit.recipe)
            .filter(recipe => recipe.totalTime && recipe.totalTime > 0);

          const sortedRecipes = data.sort((a, b) => {
            const complexityA = calculateComplexity(a);
            const complexityB = calculateComplexity(b);
            return complexityA - complexityB;
          });

          if (response.data.hits.length < 1) {
            setRecipes([]);
            setNoResults(true);
          } else {
            setRecipes(sortedRecipes);
            setNoResults(false);
          }
        })
        .catch(error => {
          console.error("Axios error: ", error)
        });
    } else {
      setRecipes([]);
      setNoResults(false);
    }
  }, [query]);

  const calculateComplexity = (recipe) => {
    const ingredientCount = recipe.ingredientLines.length;
    const dishType = Array.isArray(recipe.dishType) && recipe.dishType.length > 0 ? recipe.dishType[0] : '';
    const totalTime = recipe.totalTime || 0;

    let dishWeight;

    switch(dishType.toLowerCase()) {
      case "main course":
       dishWeight = 10;
       break;
      case "condiments and sauces":
        dishWeight = 5;
        break;
      case "soup":
        dishWeight = 5;
        break;
      case "desserts":
        dishWeight = 10;
        break;
      case "drinks":
        dishWeight = 5;
        break;
      case "starter":
        dishWeight = 5;
        break;
      case "snacks":
        dishWeight = 5;
        break;
      default:
        dishWeight = 1;
    }

    //console.log(recipe.dishType, dishWeight)

    if (totalTime === 0) {
      return ((ingredientCount + dishWeight / 10));
    }

    return ((ingredientCount + dishWeight / 100) + (totalTime / 10));
  }

  return (
    <>
      <div className="recipe-grid">
        {
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} ingredientCount={recipe.ingredientLines.length} dishType={recipe.dishType ? recipe.dishType[0] : 'not available'} totalTime = {recipe.totalTime} complexity={calculateComplexity(recipe)} />
          ))
        }
      </div>
      <div>
        {noResults ? (<p>No results found for entered search term!</p>) : (<p></p>)}
      </div>
    </>
  );
}


export { RecipeSearch };