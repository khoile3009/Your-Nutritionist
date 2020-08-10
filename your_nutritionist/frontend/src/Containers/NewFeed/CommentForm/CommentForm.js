import React, { Component } from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import "./CommentForm.scss";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            chk: {
                commentContentChk: null,
            },
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (event) => {
        this.setState({ comment: event.target.value });
    };

    submitCommentHandler = (event) => {
        event.preventDefault();
        this.updateErrorStateWithCallback(this.props.submitComment);
    };

    validateCommentContent = () => {
        return this.state.comment !== "";
    };

    isErrorFree = () => {
        return this.state.chk.commentContentChk;
    };

    updateErrorStateWithCallback = (callback) => {
        this.setState(
            {
                chk: { commentContentChk: this.validateCommentContent() },
            },
            () => {
                if (this.isErrorFree()) {
                    callback(this.state.comment);
                }
            }
        );
    };

    render() {
        return (
            <div className="comment-form">
                <hr></hr>
                <Form
                    onSubmit={(event) => {
                        this.submitCommentHandler(event, this.state.comment);
                    }}
                >
                    <InputGroup>
                        <FormControl
                            className="comment-input"
                            placeholder="Write a comment..."
                            as="textarea"
                            rows="2"
                            name="comment"
                            value={this.state.comment}
                            onChange={this.onChangeHandler}
                        />
                        {/* <InputGroup.Append>
							<Button className="comment-submit-btn" type="submit" variant="primary">
								Submit
							</Button>
						</InputGroup.Append> */}
                    </InputGroup>
                    {this.state.chk.commentContentChk === false ? <Form.Text className="error">Comment content cannot be left blank.</Form.Text> : null}
                    <div className="comment-submit-btn-wrapper">
                        <Button className="comment-submit-btn" type="submit">
                            Comment
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CommentForm;
