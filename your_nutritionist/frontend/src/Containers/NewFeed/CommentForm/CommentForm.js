import React, { Component } from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import "./CommentForm.scss";

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
		};
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	onChangeHandler = (event) => {
		this.setState({ comment: event.target.value });
	};

	render() {
		return (
			<div className="comment-form">
				<hr></hr>
				<Form
					onSubmit={(event) => {
						this.props.submitComment(event, this.state.comment);
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
