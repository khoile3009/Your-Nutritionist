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
import { Row, Col } from "react-bootstrap";
import SideBarContainer from "./Containers/SideBar/SideBarContainer";
import RightBarContainer from "./Containers/RightBar/RightBarContainer";
function App(props) {
	return (
		<div className="App">
			<DarkMode />
			<HeaderContainer />
			<div className="page-wrapper">
				<Row>
					<Col className="custom-col" sm="auto" md="auto">
						<SideBarContainer />
					</Col>
					<Col className="custom-col" sm={7} md={7}>
						<Switch>
							<Route path="/recipe/create" component={NewRecipeContainer} />
							<Route
								path="/recipe/:recipe_id/edit"
								render={(props) => (
									<EditRecipeContainer
										key={props.match.params["user_id"]}
										{...props}
									/>
								)}
							/>
							<Route path="/recipe/:recipe_id" component={RecipeShowContainer} />
							<Route
								path="/user/:user_id"
								render={(props) => (
									<UserShowContaner
										key={props.match.params["user_id"]}
										{...props}
									/>
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
					</Col>
					<Col className="custom-col" sm={2} md={2}>
						<RightBarContainer />
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default App;
