import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import "./ModalContent.scss";

const LoginForm = (props) => {
	return (
		<div className="signin-form-wrapper">
			<Modal.Header className="signin-header">
				<Modal.Title>Sign in</Modal.Title>
			</Modal.Header>
			<Form onSubmit={props.signinHandler}>
				<Modal.Body>
					<Form.Group controlId="formGroupUsername">
						{/* <Form.Label>Username</Form.Label> */}
						<Row>
							<Col className="register-icons" xs="auto">
								<span class="material-icons">account_circle</span>
							</Col>
							<Col>
								<Form.Control
									type="text"
									name="username"
									placeholder="Enter username"
									onChange={props.usernameChangeHandler}
									value={props.auth.username}
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						{/* <Form.Label>Password</Form.Label> */}
						<Row>
							<Col className="register-icons" xs="auto">
								<span class="material-icons">lock</span>
							</Col>
							<Col>
								<Form.Control
									type="password"
									name="password"
									placeholder="Password"
									onChange={props.passwordChangeHandler}
									value={props.auth.password}
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Text className="error">{props.error}</Form.Text>
					<br></br>
					<Form.Group id="formGridCheckbox">
						<Form.Check
							type="checkbox"
							name="save"
							label="Stay signed in"
							onClick={props.rememberUserHandler}
						/>
					</Form.Group>

					<a href="" onClick={props.showRegisterModal} style={{ paddingRight: "10px" }}>
						Create an account
					</a>
					{/* <a href="" onClick={props.showForgetPasswordModal}>
						Forgot Password
					</a> */}
				</Modal.Body>
				<Modal.Footer>
					<Button className="register-btn register-cancel" onClick={props.hideModal}>
						<span class="material-icons">close</span>
					</Button>
					<Button className="register-btn register-submit" type="submit">
						<span class="material-icons">check</span>
					</Button>
				</Modal.Footer>
			</Form>
		</div>
	);
};

const RegisterForm = (props) => {
	return (
		<div className="register-form-wrapper">
			<Modal.Header className="register-header">
				<Modal.Title>Register</Modal.Title>
			</Modal.Header>
			<Form onSubmit={props.registerHandler}>
				<Modal.Body>
					<Form.Group controlId="formGroupUsername">
						{/* <Form.Label>Username *</Form.Label> */}
						<Row>
							<Col className="register-icons" xs="auto">
								<span class="material-icons">account_circle</span>
							</Col>
							<Col>
								<Form.Control
									type="text"
									placeholder="Enter username *"
									name="username"
									onChange={props.usernameChangeHandler}
									value={props.auth.username}
								/>
								{props.ok.okUsername === false ? (
									<Form.Text className="error">
										Username should be at least 6 characters
									</Form.Text>
								) : null}
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						{/* <Form.Label>Name</Form.Label> */}
						<Row>
							<Col style={{ marginRight: "8px" }}>
								<Form.Control
									placeholder="First name *"
									name="first_name"
									onChange={props.first_nameChangeHandler}
									value={props.auth.first_name}
								/>
							</Col>
							<Col>
								<Form.Control
									placeholder="Last name *"
									name="last_name"
									onChange={props.last_nameChangeHandler}
									value={props.auth.last_name}
								/>
							</Col>
						</Row>
						{props.ok.okName === false ? (
							<Form.Text className="error">Name must not leave blank</Form.Text>
						) : null}
					</Form.Group>
					<Form.Group controlId="formGroupEmail">
						{/* <Form.Label>Email address *</Form.Label> */}
						<Row>
							<Col className="register-icons" xs="auto">
								<span class="material-icons">email</span>
							</Col>
							<Col>
								<Form.Control
									type="email"
									placeholder="Enter email *"
									name="email"
									onChange={props.emailChangeHandler}
									value={props.auth.email}
								/>
								{props.ok.okEmail === false ? (
									<Form.Text className="error">Email not correct</Form.Text>
								) : null}
							</Col>
						</Row>
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Row>
							<Col className="register-icons" xs="auto">
								<span class="material-icons">lock</span>
							</Col>
							<Col>
								<Form.Control
									type="password"
									placeholder="Password *"
									name="password"
									onChange={props.passwordChangeHandler}
									value={props.auth.password}
								/>
								{props.ok.okPassword === false ? (
									<Form.Text className="error">
										Password should be at least 8 characters
									</Form.Text>
								) : null}
							</Col>
						</Row>
						{/* <Form.Label>Password *</Form.Label> */}
					</Form.Group>
					<Form.Group controlId="formGroupRenterPassword">
						{/* <Form.Label>Re-enter Password *</Form.Label> */}
						<Row>
							<Col className="register-icons" xs="auto">
								<span class="material-icons">replay</span>
							</Col>
							<Col>
								<Form.Control
									type="password"
									placeholder="Re-enter Password *"
									name="repassword"
									onChange={props.repasswordChangeHandler}
									value={props.auth.repassword}
								/>
								{props.ok.okRePassword === false ? (
									<Form.Text className="error">Password does not match</Form.Text>
								) : null}
							</Col>
						</Row>
					</Form.Group>
					<code>* Required fields</code>
					<Form.Group id="formGridCheckbox">
						<Form.Check type="checkbox" label="Stay signed in" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword"></Form.Group>
					<br></br>
					<a href="" onClick={props.showSigninModal} style={{ paddingRight: "10px" }}>
						Already have an account
					</a>
					{/* <a href="" onClick={props.showForgetPasswordModal}>
						Forgot Password
					</a> */}
				</Modal.Body>
				<Modal.Footer>
					<Button className="register-btn register-cancel" onClick={props.hideModal}>
						<span class="material-icons">close</span>
					</Button>
					<Button className="register-btn register-submit" type="submit">
						<span class="material-icons">check</span>
					</Button>
				</Modal.Footer>
			</Form>
		</div>
	);
};

const ForgotPasswordForm = (props) => {
	return (
		<>
			<Modal.Header>
				<Modal.Title>Reset Password</Modal.Title>
			</Modal.Header>
			<Form>
				<Modal.Body>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Enter your email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.hideModal}>
						Close
					</Button>
					<Button variant="primary" onClick={props.hideModal}>
						Reset Password
					</Button>
				</Modal.Footer>
			</Form>
		</>
	);
};

const SigninRequiredForm = (props) => {
	return (
		<>
			<Modal.Header>
				<Modal.Title>Sign in required </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Only a registered user can use this feature</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.hideModal}>
					Back to main menu
				</Button>
				<Button variant="primary" onClick={props.showSigninModal}>
					Sign in
				</Button>
				<Button variant="primary" onClick={props.showRegisterModal}>
					Register
				</Button>
			</Modal.Footer>
		</>
	);
};

const InfoForm = (props) => {
	return (
		<>
			<Modal.Header>
				<Modal.Title>User Information</Modal.Title>
			</Modal.Header>
			<Form onSubmit={props.submitInfoHandler}>
				<Modal.Body>
					<Form.Group controlId="formGroupHeadline">
						<Form.Label>Headline</Form.Label>
						<Form.Control
							type="text"
							name="headline"
							placeholder="Current jobs, favorite quotes, etc"
							onChange={props.headlineChangeHandler}
							value={props.user_info.headline}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupIntroduction">
						<Form.Label>Introduction</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Hi I'm.. "
							name="introduction"
							value={props.user_info.information}
							onChange={props.introductionChangeHandler}
							rows="3"
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.hideModal}>
						Fill this later
					</Button>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Modal.Footer>
			</Form>
		</>
	);
};

export { LoginForm, RegisterForm, ForgotPasswordForm, SigninRequiredForm, InfoForm };
