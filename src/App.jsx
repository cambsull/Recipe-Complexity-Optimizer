import { useState } from 'react'
import './App.css'

import {RecipeSearch} from './util/RecipeSearch.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch () {
    setQuery(searchTerm);
  }
 
  return (
    <>
    <div className="title">ADHD Recipe Finder</div>
    <h2>Search for a recipe and the results will be sorted by relative complexity!</h2>
      <div>
        <input
          className = "searchBar"
          type = "text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
        />

        <button onClick={handleSearch}> Search </button>

        <RecipeSearch query={query} />
      </div>
    </>
  )
}

export default App
