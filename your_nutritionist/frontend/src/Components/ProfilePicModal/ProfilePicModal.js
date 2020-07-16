import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
const ProfilePicModal = (props) => {
	return (
		<Modal show={props.modal !== 0} onHide={props.hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header>
				<Modal.Title>Choose a new profile picture</Modal.Title>
			</Modal.Header>
			<Form onSubmit={props.submitProfilePic}>
				<Modal.Body>
					{props.modal === 1 ? (
						<Form.Group controlId="formGroupUsername">
							<Form.Label>File</Form.Label>
							<Form.File name="myImage" style={{ padding: '0', overflow: 'hidden' }} accept="image/x-png,image/gif,image/jpeg" onChange={props.fileChangeHandler} label={<p style={{}}>{props.file_title}</p>} custom />
						</Form.Group>
					) : (
						<Form.Group controlId="formGroupUsername">
							<Form.Label>Url</Form.Label>

							<Form.Control type="text" name="url" placeholder="Enter url for profile picture" onChange={props.urlChangeHandler} value={props.url} />
						</Form.Group>
					)}
					{props.uploading ? <Form.Text>Uploading...</Form.Text> : null}

					<a href="" onClick={props.changeProfilePicFormType} style={{ paddingRight: '10px' }}>
						{props.modal === 1 ? 'Choose URL' : 'Attach file'}
					</a>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.hideModal}>
						Close
					</Button>
					<Button variant="primary" type="submit">
						Upload
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default ProfilePicModal;
