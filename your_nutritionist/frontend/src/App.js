import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch } from 'react-router-dom'
import NewRecipeContainer from './Components/NewRecipe/NewRecipeContainer'
import HeaderContainer from './Components/Header/HeaderContainer'

import RecipeShowContainer from './Components/RecipeShow/RecipeShowContainer';
function App() {
  return (
    <div className="App">
      <HeaderContainer></HeaderContainer>
      <Switch>
        <Route path='/recipe/create' component={NewRecipeContainer}></Route>
        <Route path='/recipe/:recipe_id' component={RecipeShowContainer} />
      </Switch>
    </div>
  );
}

export default App;
