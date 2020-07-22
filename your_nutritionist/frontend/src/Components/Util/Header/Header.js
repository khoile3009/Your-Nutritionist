import { Navbar, Nav } from "react-bootstrap";
import React from "react";
import { Link, NavLink, Route } from "react-router-bootstrap";
import "./Header.css";

const Header = (props) => (
    <Navbar className="color-nav" collapseOnSelect expand="lg">
        {/* "Link" in brand component since just redirect is needed */}
        <Navbar.Brand as={Link} to="/" id="brand-color">
            <img
                src={"https://storage.googleapis.com/your-nutritionist-cdn/transparent-bg-placeholder.png"}
                style={{
                    width: 50,
                    margin: 5,
                }}
            />
            <span id="brand-title">
                <a href="/homepage">Cookery</a>
            </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                {/* "NavLink" here since "active" class styling is needed */}
                <Nav.Link style={{ display: "none" }} onClick={props.toCreateRecipe} href="/recipe/create">
                    Create Recipe
                </Nav.Link>
                <form onSubmit={props.searchSubmit}>
                    <div className="searchBar">
                        <input type="text" name="" placeholder="Search..." value={props.search_input} onChange={props.onChangeSearchBar} />
                        <div>
                            <button className="search" onClick="search" type="submit" />
                        </div>
                    </div>
                </form>
            </Nav>
            {props.rightNav}
        </Navbar.Collapse>
    </Navbar>
);

export default Header;
