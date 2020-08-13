import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import "./RightNav.scss";
import DarkModeToggleContainer from "../../../Containers/Util/DarkModeToggle/DarkModeToggleContainer";

const AuthenticationNav = (props) => {
	return (
		<Nav>
			<Nav.Link onClick={props.showSigninModal}>Sign in</Nav.Link>
			<Nav.Link onClick={props.showRegisterModal}>Register</Nav.Link>
		</Nav>
	);
};

const UserNav = (props) => {
	return (
		<Nav className="rightnav-wrapper">
			<NavDropdown
				className="nav-dropdown"
				title={"Welcome back, " + props.username + "!"}
				id="basic-nav-dropdown"
				alignRight
			>
				<NavDropdown.Item onClick={props.toUserPage}>Profile</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={props.signout}>Sign out</NavDropdown.Item>
				<NavDropdown.Divider />
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<DarkModeToggleContainer></DarkModeToggleContainer>
				</div>
			</NavDropdown>
		</Nav>
	);
};
export { AuthenticationNav, UserNav };
