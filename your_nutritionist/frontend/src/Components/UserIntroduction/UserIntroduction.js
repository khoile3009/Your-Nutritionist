import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./UserIntroduction.css"

const UserIntroduction = (props) => {
	return props.introduction !== "" ? (
		<>
			<p className="subtitle">Introduction</p>
			{console.log(props.userId)}
			{props.isSelf ? (<Button onClick={props.showEditIntro} className="edit-intro-btn">🖉</Button>) : null}
			<p className="headline">{props.introduction}</p>
		</>
	) : null;
};

export default UserIntroduction;
