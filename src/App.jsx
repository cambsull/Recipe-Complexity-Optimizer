import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//
import {RecipeSearch} from './util/RecipeSearch.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch () {
    setQuery(searchTerm);
  }
 
  return (
    <>
      <div>
        <input
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
