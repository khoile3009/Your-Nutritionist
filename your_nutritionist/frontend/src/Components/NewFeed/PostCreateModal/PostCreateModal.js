import React from "react";
import "./PostCreateModal.scss";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import SigninRequired from "../../../Containers/Util/SigninRequired/SigninRequired";

const PostCreateModal = (props) => {
	return (
		<div className="post-create-wrapper">
			<Modal size="lg" show={props.modal == true} onHide={props.hideModal} aria-labelledby="contained-modal-title-vcetner" centered>
				<Modal.Header>
					<Modal.Title>Create new post</Modal.Title>
				</Modal.Header>
				<Form onSubmit={props.submitForm}>
					<Modal.Body>
						<Form.Group controlId="NewPostContent">
							<Form.Control onChange={props.contentChangeHandler} value={props.content} style={{ fontSize: "12pt" }} as="textarea" rows="4" placeholder="Say what you wanna say..." />
						</Form.Group>
						{props.modal === 1 ? (
							<Form.Group controlId="NewPostMedia">
								<Form.Label>Upload media</Form.Label>
								<Form.File
									type="text"
									name="postMediaUpload"
									placeholder="Enter Photo or Video URL"
									onChange={props.fileChangeHandler}
									accept="image/x-png, image/gif, image/jpeg, video/mp4"
									label={<p style={{}}>{props.file_title}</p>}
									custom
								/>
							</Form.Group>
						) : (
							<Form.Group controlID="NewPostMedia">
								<Form.Label>Link media</Form.Label>
								<Form.Control type="text" name="url" placeholder="Enter url for media" onChange={props.urlChangeHandler} value={props.url} />
							</Form.Group>
						)}
						{props.uploading ? <Form.Text>Uploading...</Form.Text> : null}
						<a href="" onClick={props.changeNewPostFormType} style={{}}>
							{props.modal === 1 ? "Choose URL" : "Upload media"}
						</a>
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
