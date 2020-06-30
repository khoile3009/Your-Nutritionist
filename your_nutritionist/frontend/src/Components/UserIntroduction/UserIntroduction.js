import React from "react";
import { Row, Col } from "react-bootstrap";
const UserIntroduction = (props) => {
	return props.introduction !== "" ? (
		<>
			<p className="subtitle">Introduction</p>
			<p className="headline">{props.introduction}</p>
		</>
	) : null;
};

export default UserIntroduction;
