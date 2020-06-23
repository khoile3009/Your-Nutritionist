import { Navbar, Nav} from 'react-bootstrap';
import React from 'react';
import { Link, NavLink, Route } from 'react-router-bootstrap';

const Header = (props) =>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        {/* "Link" in brand component since just redirect is needed */}
        <Navbar.Brand as={Link} to="/">
            Cookery
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mr-auto'>
                {/* "NavLink" here since "active" class styling is needed */}
                <Nav.Link onClick={props.toHomePage} href='/home'>
                    Home
                </Nav.Link>
                <Nav.Link onClick={props.toCreateRecipe} href='/recipe/create'>
                    Create Recipe
                </Nav.Link>
                <Nav.Link onClick={()=>{}} href='/user'>
                    Find User
                </Nav.Link>

            </Nav>
            {props.rightNav}

        </Navbar.Collapse>

    </Navbar>

export default Header;