import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch } from 'react-router-dom';
import NewRecipeContainer from './Containers/NewRecipe/NewRecipeContainer';
import HeaderContainer from './Containers/Header/HeaderContainer';
import RecipeShowContainer from './Containers/RecipeShow/RecipeShowContainer';
import UserShowContaner from './Containers/UserShow/UserShowContainer';
import NewFeedContainer from './Containers/NewFeed/NewFeedContainer';
import NewFeedPage from './Pages/NewFeed/NewFeedPage'
import HomePage from './Pages/Home/HomePage'
import DevPage from './Pages/Dev/DevPage'
function App() {
  return (
    <div className="App">
      <HeaderContainer></HeaderContainer>
      <Switch>
        <Route path='/recipe/create' component={NewRecipeContainer}/>
        <Route path='/recipe/:recipe_id' component={RecipeShowContainer}/>
        <Route path='/user/:user_id' component={UserShowContaner}/>
        <Route path='/feed' component={NewFeedPage}/>
        <Route path='/home' component={HomePage}/>
        <Route path='/dev' component={DevPage}/>
      </Switch>
    </div>
  );
}

export default App;
