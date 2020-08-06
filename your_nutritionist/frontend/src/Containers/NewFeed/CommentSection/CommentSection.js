import React, { Component } from "react";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

class CommentSection extends Component {
	constructor(props) {
		super(props);
		this.state = { comments: this.props.comments };
		this.submitComment = this.submitComment.bind(this);
	}

	submitComment = (event, comment) => {
		event.preventDefault();
		let data = new FormData();
		data.append("content", comment);
		axios
			.post("api/post/" + this.props.post_id + "/comment", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Token " + this.props.token,
				},
			})
			.then((response) => {
				let comments = this.state.comments;
				comments.unshift(response.data);
				this.setState({ comments: comments });
			});
	};

	render() {
		return (
			<>
				<CommentList comments={this.state.comments} />
				<CommentForm submitComment={this.submitComment} />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, () => {})(CommentSection);
