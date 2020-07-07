import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./UserIntroduction.css"

const UserIntroduction = (props) => {
	return props.introduction !== "" ? (
		<>
			<p className="subtitle">Introduction</p><Button className="edit-intro-btn">🖉</Button>
			<p className="headline">{props.introduction}</p>
		</>
	) : null;
};

export default UserIntroduction;
