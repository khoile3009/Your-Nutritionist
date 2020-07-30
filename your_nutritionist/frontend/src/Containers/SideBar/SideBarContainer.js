import React, { Component } from 'react';
import SideBar from '../../Components/Util/SideBar/SideBar';
import { withRouter } from 'react-router-dom';
import TrendingCard from '../../Components/Home/TrendingCard/TrendingCard';
import PostCreateModal from '../../Components/NewFeed/PostCreateModal/PostCreateModal';
import './SideBarContainer.scss';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

class SideBarContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: 0,
			url: '',
			file: null,
			content: ''
		};
		this.showCreatePostModal = this.showCreatePostModal.bind(this);
		this.resetCreatePostInput = this.resetCreatePostInput.bind(this);
		this.toCreateRecipe = this.toCreateRecipe.bind(this);
		this.toTrendingRecipe = this.toTrendingRecipe.bind(this);
		this.urlChangeHandler = this.urlChangeHandler.bind(this);
		this.fileChangeHandler = this.fileChangeHandler.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.dataFromNewPostForm = this.dataFromNewPostForm.bind(this)
		this.addMedia = this.addMedia.bind(this)
		this.deleteMedia = this.deleteMedia.bind(this)
		this.contentChangeHandler = this.contentChangeHandler.bind(this)
	}

	toCreateRecipe = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.history.push('/recipe/create');
	};

	changeNewPostFormType = (event) => {
		event.preventDefault();
		this.resetCreatePostInput();
		this.setState({
			modal: -this.state.modal
		});
	};

	resetCreatePostInput = () => {
		this.setState({
			url: '',
			file: null,
			file_title: '',
			content: ''
		});
	};

	showCreatePostModal = () => {
		this.resetCreatePostInput();
		this.setState({
			modal: 1
		});
	};

	hideModal = () => {
		this.setState({
			modal: 0,
			uploading: false
		});
	};

	urlChangeHandler = (event) => {
		this.setState({
			url: event.target.value
		});
	};

	fileChangeHandler = (event) => {
		if (event.target.files && event.target.files.length !== 0) {
			this.setState({
				file: event.target.files[0],
				file_title: event.target.files[0].name
			});
		}
	};

	contentChangeHandler = (event) => {
		this.setState({ content: event.target.value })
	}

	toTrendingRecipe = (recipe_id) => {
		this.props.history.push('/recipe/' + recipe_id);
	};

	// Media
	addMedia = () => {
        let tmp = this.state.medias
        tmp.push({
            type: 0,
            name: '',
            url: '',
            fileId: -1,
            label: 'Choose an image'
        })
        this.setState({ medias: tmp })
	}
	
	deleteMedia = (index) => {
        let medias = this.state.medias;
        let files = this.state.files;
        if (medias[index].fileId !== -1) {
            files = this.removeElementAtIndex(files, medias[index].fileId)
        }
        medias = this.removeElementAtIndex(medias, index)
        this.setState({ medias: medias, files: files }, () => { console.log(this.state) })
    }

	// Submit 
	submitForm = (event) => {
		// console.log(this.state)
		event.preventDefault();
		let data = this.dataFromNewPostForm()
		axios.post('api/post/create', data, {
			headers: {
				'Content-Type': "multipart/form-data",
				'Authorization': 'Token ' + this.props.token
			}
		})
			.then(() => {
				this.props.history.push('/homepage')
				this.hideModal()
			})
	}

	dataFromNewPostForm = () => {
		let data = new FormData();
		console.log(JSON.stringify({
			content: this.state.content,
			medias: []
		}))
		data.append('post', JSON.stringify({
			content: this.state.content,
			medias: []
		}))
		// data = this.add_images_to_form_data(data, this.state.files)
        return data
	};

	// add_images_to_form_data(data, images) {
    //     for (var image_index = 0; image_index < images.length; image_index++) {
    //         data.append('image_' + image_index, images[image_index])
    //     }
    //     return data
    // }

	render() {
		let fakeTrendingRecipes = [
			{
				recipe_id: 1,
				creator_id: 3,
				creator_name: 'Hoang Anh',
				recipe_name: 'gà rán kfc',
				recipe_favorites: 69,
				recipe_ratings: 5,
				recipe_creation_date: '2020年07月24日'
			},
			{
				recipe_id: 2,
				creator_id: 2,
				creator_name: 'Hoang Anh',
				recipe_name: 'really gà rán kfc',
				recipe_favorites: 420,
				recipe_ratings: 4,
				recipe_creation_date: '2020年07月24日'
			},
			{
				recipe_id: 3,
				creator_id: 1,
				creator_name: 'Hoang Anh',
				recipe_name: 'not gà rán kfc',
				recipe_favorites: 247,
				recipe_ratings: 3,
				recipe_creation_date: '2020年07月24日'
			},
			{
				recipe_id: 4,
				creator_id: 1,
				recipe_name: 'is not gà rán kfc',
				recipe_favorites: 247,
				recipe_ratings: 3,
				recipe_creation_date: '2020年07月24日'
			},
			{
				recipe_id: 53,
				creator_id: 1,
				recipe_name: 'xor gà rán kfc',
				recipe_favorites: 247,
				recipe_ratings: 3,
				recipe_creation_date: '2020年07月24日'
			}
		];
		return (
			<div className="sidebar-container">
				<PostCreateModal
					contentChangeHandler={this.contentChangeHandler}
					content={this.state.content} 
					modal={this.state.modal} 
					hideModal={this.hideModal} 
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
				></PostCreateModal>
					
				<SideBar
					toCreateRecipe={(event) => {
						this.toCreateRecipe(event);
					}}
					showCreatePostModal={this.showCreatePostModal}
				/>
				{fakeTrendingRecipes.map((recipe, index) => {
					return (
						<TrendingCard
							rank={index + 1}
							recipe={recipe}
							toTrendingRecipe={() => {
								this.toTrendingRecipe(recipe.recipe_id);
							}}
						/>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, () => { })(withRouter(SideBarContainer));
