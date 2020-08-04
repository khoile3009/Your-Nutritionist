import React, { Component } from "react";
import {
	PostContent,
	PostInteraction,
	PostProfilePic,
	PostUsername,
} from "../../../Components/NewFeed/PostCard/index";
import PostMediaContainer from "../PostMedia/PostMediaContainer";
import { withRouter } from "react-router-dom";
import axios from "../../../axios-orders";
import CommentSection from "../CommentSection/CommentSection";
import { connect } from "react-redux";

class PostCardContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			showComments: false,
			last_id: -1,
			post: this.props.post,
		};
		this.toCreator = this.toCreator.bind(this);
		this.loadComment = this.loadComment.bind(this);
		this.toggleCommentSection = this.toggleCommentSection.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
	}

	toCreator = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.history.push("/user/" + this.state.post.user_id);
	};

	loadComment = () => {
		axios
			.get("api/post/" + this.state.post.post_id + "/comment", {
				params: { before_id: this.state.last_id },
			})
			.then((response) => {
				let comments = this.state.comments;
				console.log(response);
				comments.push.apply(comments, response.data.comments);
				this.setState({ comments: comments });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	toggleLike = () => {
		if (this.props.token) {
			if (this.state.post.liked) {
				axios
					.delete("api/post/" + this.state.post.post_id + "/like", {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: "Token " + this.props.token,
						},
					})
					.then((response) => {
						console.log(response.data);
					});
			} else {
				axios
					.post("api/post/" + this.state.post.post_id + "/like", null, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: "Token " + this.props.token,
						},
					})
					.then((response) => {
						console.log(response.data);
					});
			}
			this.setState({
				post: {
					...this.state.post,
					num_like: this.state.post.liked
						? this.state.post.num_like - 1
						: this.state.post.num_like + 1,
					liked: !this.state.post.liked,
				},
			});
		}
	};

	toggleCommentSection = () => {
		if (this.state.showComments) {
			this.setState({ comments: [], showComments: false });
		} else {
			axios
				.get("api/post/" + this.state.post.post_id + "/comment", {
					params: { before_id: -1 },
				})
				.then((response) => {
					let comments = this.state.comments;
					console.log(response);
					comments.push.apply(comments, response.data.comments);
					this.setState({ comments: comments, showComments: true });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	render() {
		return (
			<div className="card newfeedcard-wrapper container">
				<PostProfilePic
					profilepic={this.state.post.profilepic}
					toCreator={this.toCreator}
				/>
				<PostUsername
					fullname={this.state.post.fullname}
					username={this.state.post.username}
					toCreator={this.toCreator}
				/>
				<PostContent content={this.state.post.content} />
				{this.state.post.medias && this.state.post.medias.length != 0 ? (
					<PostMediaContainer medias={this.state.post.medias} />
				) : null}

				<PostInteraction
					liked={this.state.post.liked}
					num_like={this.state.post.num_like}
					num_comment={this.state.post.num_comment}
					loadComment={this.loadComment}
					toggleLike={this.toggleLike}
					toggleCommentSection={this.toggleCommentSection}
				/>
				{this.state.showComments ? (
					<CommentSection
						comments={this.state.comments}
						post_id={this.state.post.post_id}
					/>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, () => {})(withRouter(PostCardContainer));
