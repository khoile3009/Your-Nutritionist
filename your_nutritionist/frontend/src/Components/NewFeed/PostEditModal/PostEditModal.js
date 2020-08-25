import React from "react";
// import Connect from "react-redux";
import "./PostEditModal.scss";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";

const PostEditModal = (props) => {
    return (
        <div className="post-edit-wrapper">
            <Modal size="lg" show={props.postEdit.showEdit} onHide={props.hideEditModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Edit post</Modal.Title>
                </Modal.Header>
                <Form onSubmit={props.submitEdit}>
                    <Modal.Body>
                        <Form.Group controlId="EditPostContent">
                            {/* {console.log(props)} */}
                            <Form.Control
                                onChange={props.editChangeHandler}
                                value={props.postEdit.postContent}
                                style={{ fontSize: "12pt" }}
                                as="textarea"
                                rows="4"
                            ></Form.Control>
                            {/* {props.chk.postContentChk === false ? <Form.Text className="error">Post content cannot be blank</Form.Text> : null} */}
                        </Form.Group>
                        {/* {props.uploading ? <Form.Text>Uploading...</Form.Text> : null} */}
                    </Modal.Body>
                    <hr></hr>
                    <Row>
                        <Col>
                            <Button className="cancel-edit-btn" onClick={props.hideEditModal}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button type="submit" className="edit-post-btn">
                                Edit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default PostEditModal;
