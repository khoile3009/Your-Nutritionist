import PostCreateModal from "../../../Components/NewFeed/PostCreateModal/PostCreateModal";
import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PostCreateContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			files: [],
			medias: [],
			content: "",
			chk: {
				postContentChk: null,
			},
		};
		this.urlChangeHandler = this.urlChangeHandler.bind(this);
		this.fileChangeHandler = this.fileChangeHandler.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.dataFromNewPostForm = this.dataFromNewPostForm.bind(this);
		this.contentChangeHandler = this.contentChangeHandler.bind(this);
		this.resetAndHideModal = this.resetAndHideModal.bind(this);
		this.resetData = this.resetData.bind(this);
		this.setMedia = this.setMedia.bind(this);

		// Input validation:
		this.postContentValidate = this.postContentValidate.bind(this);
	}

	// Input validation functions:
	postContentValidate = () => {
		return this.state.content !== "";
	};

	// Modal

	resetAndHideModal = () => {
		this.resetData();
		this.props.hideModal();
	};

	resetData = () => {
		this.setState({
			url: "",
			file: null,
			content: "",
			uploading: false,
		});
	};
	urlChangeHandler = (event) => {
		this.setState({
			url: event.target.value,
		});
	};

    // Modal

    resetAndHideModal = () => {
        this.resetData();
        this.props.hideModal();
    };

	setMedia = (medias, files) => {
		this.setState({ medias: medias, files: files });
	};

	// Submit
	submitForm = () => {
		// console.log(this.state)
		let data = this.dataFromNewPostForm();
		this.setState({ uploading: true });
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
				console.log(error);
			});
	};

	SubmitFormHandler = (event) => {
		event.preventDefault();
		console.log(this.submitForm);
		this.updateErrorStateWithCallback(this.submitForm);
	};

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

	isErrorFree = () => {
		return this.state.chk.postContentChk;
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
				medias: this.state.medias,
			})
		);
		data = this.addMediaToFormData(data, this.state.files);
		return data;
	};

	addMediaToFormData = (data, files) => {
		for (var media_index = 0; media_index < files.length; media_index++) {
			data.append("media_" + media_index, files[media_index]);
		}
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
				submitForm={this.SubmitFormHandler}
				medias={this.state.medias}
				deleteMedia={this.deleteMedia}
				addMedia={this.addMedia}
				modal={this.props.modal}
				setMedia={this.setMedia}
				error={this.props.error}
				chk={this.state.chk}
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

export default connect(mapStateToProps, () => {})(withRouter(PostCreateContainer));
