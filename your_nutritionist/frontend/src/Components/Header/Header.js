import { Navbar, Nav} from 'react-bootstrap';
import React from 'react';
import { Link, NavLink, Route } from 'react-router-bootstrap';
import './Header.css'

const Header = (props) =>
    <Navbar className="color-nav" collapseOnSelect expand="lg">
        {/* "Link" in brand component since just redirect is needed */}
        <Navbar.Brand as={Link} to="/" id="brand-color">
            <img src={"https://storage.googleapis.com/your-nutritionist-cdn/Face.png"} style={{width: 50, border: '0.5px solid rgb(255,200,176)', margin: 5, }}/>
            <span id="brand-title">Cookery</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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