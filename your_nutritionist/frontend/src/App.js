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
import SearchPage from './Pages/Search/SearchPage'
import DevPage from './Pages/Dev/DevPage'
import queryString from 'query-string';
function App() {
  return (
    <div className="App">
      <HeaderContainer></HeaderContainer>
      <Switch>
        <Route path='/recipe/create' component={NewRecipeContainer}/>
        <Route path='/recipe/:recipe_id' component={RecipeShowContainer}/>
        <Route path='/user/:user_id' render={
          (props) => (<UserShowContaner key={props.match.params['user_id']} {...props}/>)
        }/>
        <Route path='/feed' component={NewFeedPage}/>
        <Route path='/search' render={
          (props) => (<SearchPage key={queryString.parse(props.location.search).query} {...props}></SearchPage>)
        }/>
        <Route path='/dev' component={DevPage}/>
      </Switch>
    </div>
  );
}

export default App;
