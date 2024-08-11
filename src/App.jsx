import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//
import {RecipeSearch} from './util/RecipeSearch.jsx';

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <RecipeSearch query="tilapia" />
    </>
  )
}

export default App
