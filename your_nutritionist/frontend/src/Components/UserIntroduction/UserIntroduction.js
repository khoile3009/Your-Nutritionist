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
			<p className="subtitle">Introduction</p>
			{console.log(props.userId)}
			{props.logged_in && props.isSelf ? (<Button onClick={props.startIntroductionEdit} className="edit-intro-btn">🖉</Button>) : null}
			<p className="introduction">{props.introduction}</p>
		</>
;
};

export default UserIntroduction;
