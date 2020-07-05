import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NewRecipeContainer from "./Containers/NewRecipe/NewRecipeContainer";
import HeaderContainer from "./Containers/Header/HeaderContainer";
import RecipeShowContainer from "./Containers/RecipeShow/RecipeShowContainer";
import UserShowContaner from "./Containers/UserShow/UserShowContainer";
import NewFeedContainer from "./Containers/NewFeed/NewFeedContainer";
import NewFeedPage from "./Pages/NewFeed/NewFeedPage";
import SearchPage from "./Pages/Search/SearchPage";
import DevPage from "./Pages/Dev/DevPage";
import queryString from "query-string";
import EditRecipeContainer from "./Containers/Edit/EditRecipeContainer";

function App() {
	return (
		<div className="App">
			<HeaderContainer></HeaderContainer>
			<Switch>
				<Route path="/recipe/create" component={NewRecipeContainer} />
				<Route path="/recipe/:recipe_id/edit" component={EditRecipeContainer}></Route>
				<Route path="/recipe/:recipe_id" component={RecipeShowContainer} />
				<Route
					path="/user/:user_id"
					render={(props) => <UserShowContaner key={props.match.params["user_id"]} {...props} />}
				/>
				<Route path="/feed" component={NewFeedPage} />
				<Route
					path="/search"
					render={(props) => (
						<SearchPage key={queryString.parse(props.location.search).query} {...props}></SearchPage>
					)}
				/>
				<Route path="/dev" component={DevPage} />
			</Switch>
			<div className="home-banner"></div>
			<div className="homepage">
				<h1>Local development server</h1>
				<h3>Some theme values:</h3>
				<ul>
					<li>Primary brand color: <div style={{display:"inline-block", background:"#00acc1", width: "50px", height: "50px"}}></div> #00acc1</li>
					<li>Dark primary: <div style={{display:"inline-block", background:"#0096a7", width: "50px", height: "50px"}}></div> #0096a7</li>
					<li>Accent color: <div style={{display:"inline-block", background:"#ff5252", width: "50px", height: "50px"}}></div> #ff5252</li>
					<li>Primary text: <div style={{display:"inline-block", background:"#0000", width: "50px", height: "50px"}}></div> #0000 (absolute black RGB)</li>
					<li>Secondary text: <div style={{display:"inline-block", background:"#ffffff", width: "50px", height: "50px"}}></div> #ffffff</li>
					<li>Button general: <div style={{display:"inline-block", background:"#303030", width: "50px", height: "50px"}}></div> #303030</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
