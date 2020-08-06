import React from "react";
import "./PostCreateModal.scss";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import SigninRequired from "../../../Containers/Util/SigninRequired/SigninRequired";
import MediaUploadContainer from "../../../Containers/Util/MediaUpload/MediaUploadContainer";

const PostCreateModal = (props) => {
	return (
		<div className="post-create-wrapper">
			<Modal size="lg" show={props.modal} onHide={props.hideModal} aria-labelledby="contained-modal-title-vcetner" centered>
				<Modal.Header>
					<Modal.Title>Create new post</Modal.Title>
				</Modal.Header>
				<Form onSubmit={props.submitForm}>
					<Modal.Body>
						<Form.Group controlId="NewPostContent">
							<Form.Control onChange={props.contentChangeHandler} value={props.content} style={{ fontSize: "12pt" }} as="textarea" rows="4" placeholder="Say what you wanna say..." />
						</Form.Group>
						{props.uploading ? <Form.Text>Uploading...</Form.Text> : null}
						<MediaUploadContainer setMedia={props.setMedia}/>
					</Modal.Body>
					<hr></hr>

					<Row>
						<Col>
							<Button onClick={props.hideModal} className="cancel-post-btn">
								Cancel
							</Button>
						</Col>
						<Col>
							<Button type="submit" className="create-post-btn">
								Post
							</Button>
						</Col>
					</Row>

					<br></br>
				</Form>
			</Modal>
		</div>
	);
};

export default PostCreateModal;
