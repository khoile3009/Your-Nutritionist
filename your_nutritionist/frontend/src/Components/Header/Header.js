import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
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
                <Nav.Link as={NavLink} to="/" exact>
                    Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/recipe/create">
                    Create Recipe
                </Nav.Link>

            </Nav>
            {props.rightNav}

        </Navbar.Collapse>

    </Navbar>

export default Header;