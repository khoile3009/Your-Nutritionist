import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import "./UserIntroduction.scss";

const UserIntroduction = (props) => {
	return props.introductionEdit.editing ? (
		<>
			<Form onSubmit={props.submitIntroduction}>
				<Form.Control as="textarea" row="2" value={props.introductionEdit.introduction} onChange={props.editIntroductionChangeHandler}></Form.Control>
				<br></br>
				<Button className="cancel-edit-btn" onClick={props.stopIntroductionEdit}>
					Cancel
				</Button>
				<Button className="submit-edit-btn" type="submit">
					Edit
				</Button>
			</Form>
		</>
	) : (
		<>
			<Row>
				<Col style={{ padding: 0 }}>
					<div className="subtitle">
						Introduction
						{props.logged_in && props.isSelf ? (
							<Button onClick={props.startIntroductionEdit} className="edit-intro-btn">
								&nbsp;<i class="material-icons">edit</i>
							</Button>
						) : null}
					</div>
				</Col>
			</Row>
			<Row>
				<div className="introduction">{props.introduction}</div>
			</Row>
		</>
	);
};

export default UserIntroduction;
