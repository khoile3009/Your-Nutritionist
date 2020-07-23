import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NewRecipeContainer from './Containers/Recipe/NewRecipe/NewRecipeContainer';
import HeaderContainer from './Containers/Util/Header/HeaderContainer';
import RecipeShowContainer from './Containers/Recipe/RecipeShow/RecipeShowContainer';
import UserShowContaner from './Containers/User/UserShow/UserShowContainer';
import NewFeedList from './Containers/NewFeed/NewFeedList/NewFeedList';
import SearchPage from './Pages/Search/SearchPage';
import DevPage from './Pages/Dev/DevPage';
import Homepage from './Pages/Homepage/Homepage';
import queryString from 'query-string';
import EditRecipeContainer from './Containers/Recipe/EditRecipe/EditRecipeContainer';
import SideBar from './Containers/SideBar/SideBarContainer.js';

function App() {
	return (
		<div className="App">
			<HeaderContainer />
			<SideBar />
			<Switch>
				<Route path="/recipe/create" component={NewRecipeContainer} />
				<Route path="/recipe/:recipe_id/edit" render={(props) => <EditRecipeContainer key={props.match.params['user_id']} {...props} />} />
				<Route path="/recipe/:recipe_id" component={RecipeShowContainer} />
				<Route path="/user/:user_id" render={(props) => <UserShowContaner key={props.match.params['user_id']} {...props} />} />
				<Route path="/feed" component={NewFeedList} />
				<Route path="/search" render={(props) => <SearchPage key={queryString.parse(props.location.search).query} {...props} />} />
				<Route path="/dev" component={DevPage} />
				<Route path="/homepage" component={Homepage} />
				<Route path="/">
					<Redirect to="homepage" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
