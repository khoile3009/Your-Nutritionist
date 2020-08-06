import React, { Component } from "react";
import CommentCard from "../CommentCard/CommentCard";
import "./CommentList.scss";
class CommentList extends Component {
	constructor(props) {
		super(props);
	}

	toUserPage = (event) => {
		event.preventDefault();
	};

	render() {
		return (
			<div className="comment-list">
				<span className="subtitle comment-list-title">Comments</span>
				{this.props.comments.map((comment, index) => {
					return <CommentCard comment={comment} />;
				})}
			</div>
		);
	}
}

export default CommentList;
