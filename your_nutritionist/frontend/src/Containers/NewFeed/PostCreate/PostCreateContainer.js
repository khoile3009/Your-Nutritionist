import PostCreateModal from "../../../Components/NewFeed/PostCreateModal/PostCreateModal";
import React, { Component } from "react";
import axios from "../../../axios-orders"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PostCreateContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			file: null,
			content: "",
		};
		this.urlChangeHandler = this.urlChangeHandler.bind(this);
		this.fileChangeHandler = this.fileChangeHandler.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.dataFromNewPostForm = this.dataFromNewPostForm.bind(this);
		this.contentChangeHandler = this.contentChangeHandler.bind(this);
		this.resetAndHideModal = this.resetAndHideModal.bind(this);
		this.resetData = this.resetData.bind(this)
	}

	resetAndHideModal = () => {
		this.resetData()
		this.props.hideModal()
	};

	resetData = () => {
		this.setState({
			url: "",
			file: null,
			content: "",
		})
	}
	urlChangeHandler = (event) => {
		this.setState({
			url: event.target.value,
		});
	};

	fileChangeHandler = (event) => {
		if (event.target.files && event.target.files.length !== 0) {
			this.setState({
				file: event.target.files[0],
				file_title: event.target.files[0].name,
			});
		}
	};

	contentChangeHandler = (event) => {
		this.setState({ content: event.target.value });
	};

	// Submit
	submitForm = (event) => {
		// console.log(this.state)
		event.preventDefault();
		let data = this.dataFromNewPostForm();
		axios
			.post("api/post/create", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Token " + this.props.token,
				},
			})
			.then(() => {
				this.props.history.push("/homepage");
				this.resetData();
				this.props.hideModal();
			})
			.catch((error) => {
				console.log(error)
			});
	};

	dataFromNewPostForm = () => {
		let data = new FormData();
		console.log(
			JSON.stringify({
				content: this.state.content,
				medias: [],
			})
		);
		data.append(
			"post",
			JSON.stringify({
				content: this.state.content,
				medias: [],
			})
		);
		// data = this.add_images_to_form_data(data, this.state.files)
		return data;
	};

	render() {
		return (
			<PostCreateModal
				contentChangeHandler={this.contentChangeHandler}
				content={this.state.content}
				hideModal={this.resetAndHideModal}
				urlChangeHandler={this.urlChangeHandler}
				fileChangeHandler={this.fileChangeHandler}
				file={this.fileChangeHandler}
				url={this.state.url}
				file_title={this.state.file_title}
				uploading={this.state.uploading}
				changeNewPostFormType={this.changeNewPostFormType}
				submitForm={this.submitForm}
				medias={this.state.medias}
				deleteMedia={this.deleteMedia}
				addMedia={this.addMedia}
				modal={this.props.modal}
			></PostCreateModal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, () => { })(withRouter(PostCreateContainer));
