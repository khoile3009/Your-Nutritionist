import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import "./UserIntroduction.css"

const UserIntroduction = (props) => {
	return props.introductionEdit.editing ? 
	<>
		<Form onSubmit={props.submitIntroduction}>
        	<Form.Control value={props.introductionEdit.introduction} onChange={props.editIntroductionChangeHandler}></Form.Control>
            <Button type='submit'>Edit</Button>
            <Button variant='secondary' onClick={props.stopIntroductionEdit}>Cancel</Button>
        </Form>
	</>
	:
		<>
			<Row>
				<Col style={{padding: 0,}}><div className="subtitle">Introduction{props.logged_in && props.isSelf ? (<Button onClick={props.startIntroductionEdit} className="edit-intro-btn">&nbsp;<i class="material-icons">edit</i></Button>) : null}</div></Col>
			</Row>
			<Row>
				<div className="introduction">{props.introduction}</div>
			</Row>
		</>
;
};

export default UserIntroduction;
