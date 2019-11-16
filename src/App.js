import React, {useEffect, useState} from 'react';
import Recipe from './components/Recipe/Recipe';
import './App.css';

const App = () => {
  const APP_ID = 'e8ac8d7e';
  const APP_KEY = 'ca6850bf6d14a399f5058ea9f41ee539';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    }

    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text" value={search} 
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">Submit</button>
      </form>

      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={Math.round(recipe.recipe.calories)} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
