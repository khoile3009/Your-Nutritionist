import { Navbar, Nav } from "react-bootstrap";
import React from "react";
import { Link, NavLink, Route } from "react-router-bootstrap";
import "./Header.scss";

const Header = (props) => (
	<div className="nav-wrapper">
		<div className="header-background" />
		<Navbar className="color-nav" collapseOnSelect expand="lg">
			{/* "Link" in brand component since just redirect is needed */}
			<Navbar.Brand
				className="logo"
				onClick={props.toHomePage}
				as={Link}
				to="/homepage"
				id="brand-color"
			>
				<img
					src={"https://storage.googleapis.com/your-nutritionist-cdn/recipe-repo.png"}
					style={{
						width: 200,
					}}
				/>
			</Navbar.Brand>
			<div className="usernav-wrapper">{props.rightNav}</div>
			<div className="responsive-navbar-wrapper">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{/* "NavLink" here since "active" class styling is needed */}
						<Nav.Link
							style={{ display: "none" }}
							onClick={props.toCreateRecipe}
							href="/recipe/create"
						>
							Create Recipe
						</Nav.Link>
						<form onSubmit={props.searchSubmit}>
							<div className="searchBar">
								<input
									type="text"
									name=""
									placeholder="Search..."
									value={props.search_input}
									onChange={props.onChangeSearchBar}
								/>
								<div>
									<button className="search" onClick="search" type="submit" />
								</div>
							</div>
						</form>
					</Nav>
					{props.rightNav}
				</Navbar.Collapse>
			</div>
		</Navbar>
	</div>
);

export default Header;
