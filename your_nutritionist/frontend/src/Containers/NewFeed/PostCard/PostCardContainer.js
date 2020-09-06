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
import { Button } from "react-bootstrap";
import "./PostCardContainer.scss";
import PostEditModal from "../../../Components/NewFeed/PostEditModal/PostEditModal";

class PostCardContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			showComments: false,
			last_id: -1,
			post: this.props.post,
			postEdit: {
				showEdit: false,
				postContent: this.props.post.content,
				medias: [],
			},
			chk: {
				postContentChk: null,
			},
		};
		this.toCreator = this.toCreator.bind(this);
		this.loadComment = this.loadComment.bind(this);
		this.toggleCommentSection = this.toggleCommentSection.bind(this);
		this.toggleLike = this.toggleLike.bind(this);

		// Post edit modal
		this.showEditModal = this.showEditModal.bind(this);
		this.hideEditModal = this.hideEditModal.bind(this);
		this.editPostChangeHandler = this.editPostChangeHandler.bind(this);
		this.isErrorFree = this.isErrorFree.bind(this);
		this.postContentValidate = this.postContentValidate.bind(this);
	}

	// Edit display

	showEditModal = () => {
		this.setState({ postEdit: { showEdit: true, postContent: this.props.post.content } });
	};

	hideEditModal = () => {
		this.setState({
			postEdit: { showEdit: false },
		});
	};

	// Edit content

	editPostChangeHandler = (event) => {
		this.setState({ postEdit: { ...this.state.postEdit, postContent: event.target.value } });
	};

	// Edit submit

	submitEdit = () => {
		let data = this.dataFromEditPost();
		this.setState({
			uploading: true,
		});
		axios
			.post("api/post/create", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Token " + this.props.token,
				},
			})
			.then(() => {
				this.props.history.push("/homepage");
				this.props.hideEditModal();
			})
			.catch((error) => {
				console.log("edit post err: " + error);
			});
	};

	dataFromEditPost = () => {
		let data = new FormData();
		console.log(
			JSON.stringify({
				content: this.state.postEdit.postContent,
				media: [],
			})
		);
		data.append(
			"post",
			JSON.stringify({
				content: this.state.postEdit.postContent,
				medias: this.state.postEdit.medias,
			})
		);
	};

	submitEditHandler = (event) => {
		event.preventDefault();
		this.updateErrorStateWithCallback(this.submitEdit);
	};

	// Edit error checking

	updateErrorStateWithCallback = (callback) => {
		this.setState(
			{
				chk: {
					postContentChk: this.postContentValidate(),
				},
			},
			() => {
				console.log(this.state.chk.postContentChk);
				if (this.isErrorFree()) {
					callback();
				}
			}
		);
	};

	postContentValidate = () => {
		return this.state.postEdit.postContent !== "";
	};

	isErrorFree = () => {
		return this.state.chk.postContentChk;
	};

	// Post card UI

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
				<div className="post-edit-btn-wrapper">
					{this.props.userId === this.state.post.user_id ? (
						<Button onClick={this.showEditModal} className="edit-post-btn">
							<span className="material-icons">edit</span>
						</Button>
					) : null}
				</div>

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
				{/* {console.log(this.state.postEdit.showEdit)} */}
				{/* {console.log(this.state.postEdit.postContent)} */}
				{/* {console.log(this.props.post.content)} */}
				{this.state.postEdit.showEdit ? (
					<PostEditModal
						// show={this.state.postEdit.showEdit}
						submitEditHandler={this.state.submitEditHandler}
						content={this.state.postEdit.postContent}
						hideEditModal={this.hideEditModal}
						editChangeHandler={this.editPostChangeHandler}
						postEdit={this.state.postEdit}
					></PostEditModal>
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
