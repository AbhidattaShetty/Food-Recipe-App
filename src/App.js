import './App.css';
import Recipe from './components/Recipe';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const APP_ID = "3eaccd19"
  const APP_KEY = "f0ae7d92cc74e2f03cd9803e242f0382"
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('milk')

  useEffect(() => {
    getRecipe()
  }, [query])

  const getRecipe = async () => {
    await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=50&calories=591-722&health=alcohol-free`)
      .then((response) => {
        setRecipes(response.data.hits)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function handleClick(e) {
    setQuery(search)
    e.preventDefault()
    setSearch('')
  }

  return (
    <div>
      <Paper
        onSubmit={handleClick}
        component="form"
        sx={{ p: '2px 4px', margin: "10px auto", display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          onChange={handleChange}
          type="text"
          value={search}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search For Recipe"
          inputProps={{ 'aria-label': 'search for recipe' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recipes.map((recipe) => {
          return (
            <Grid item xs={4} sm={4} md={4} >
              <Recipe key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}

export default App;
