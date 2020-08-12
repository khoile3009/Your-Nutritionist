import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NewRecipeContainer from "./Containers/Recipe/NewRecipe/NewRecipeContainer";
import HeaderContainer from "./Containers/Util/Header/HeaderContainer";
import RecipeShowContainer from "./Containers/Recipe/RecipeShow/RecipeShowContainer";
import UserShowContaner from "./Containers/User/UserShow/UserShowContainer";
import DarkModeToggleContainer from "./Containers/Util/DarkModeToggle/DarkModeToggleContainer";
import SearchPage from "./Pages/Search/SearchPage";
import DevPage from "./Pages/Dev/DevPage";
import Homepage from "./Pages/Homepage/Homepage";
import queryString from "query-string";
import EditRecipeContainer from "./Containers/Recipe/EditRecipe/EditRecipeContainer";
import DarkMode from "./Containers/Util/DarkMode/DarkMode";
function App(props) {
	return (
		<div className="App">
			<DarkMode/>
			<HeaderContainer />
			<Switch>
				<Route path="/recipe/create" component={NewRecipeContainer} />
				<Route
					path="/recipe/:recipe_id/edit"
					render={(props) => (
						<EditRecipeContainer key={props.match.params["user_id"]} {...props} />
					)}
				/>
				<Route path="/recipe/:recipe_id" component={RecipeShowContainer} />
				<Route
					path="/user/:user_id"
					render={(props) => (
						<UserShowContaner key={props.match.params["user_id"]} {...props} />
					)}
				/>
				<Route
					path="/search"
					render={(props) => (
						<SearchPage
							key={queryString.parse(props.location.search).query}
							{...props}
						/>
					)}
				/>
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
