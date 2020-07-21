import React, { Component } from "react";

import EditRecipe from "../../../Components/Recipe/EditRecipe/EditRecipe";
import axios from "../../../axios-orders";
import SigninRequired from "../../Util/SigninRequired/SigninRequired";
import { connnect, connect } from "react-redux";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NotAuthorizedPage from "../../../Components/Util/NotAuthorizedPage/NotAuthorizedPage";

class EditRecipeContainer extends Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.recipe_data_from_form = this.recipe_data_from_form.bind(this);

		this.addIngredientSection = this.addIngredientSection.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.deleteIngredientSection = this.deleteIngredientSection.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.handleChangeIngredientSectionName = this.handleChangeIngredientSectionName.bind(this);
		this.handleChangeSameName = this.handleChangeSameName.bind(this);
		this.handleChangeIngredient = this.handleChangeIngredient.bind(this);

		this.addStepSection = this.addStepSection.bind(this);
		this.deleteStep = this.deleteStep.bind(this);
		this.deleteStepSection = this.deleteStepSection.bind(this);
		this.addStep = this.addStep.bind(this);
		this.handleChangeStepSectionName = this.handleChangeStepSectionName.bind(this);
		this.handleChangeSameName = this.handleChangeSameName.bind(this);

		this.handleChangeStepDirection = this.handleChangeStepDirection.bind(this);
		this.handleChangeStepMediaId = this.handleChangeStepMediaId.bind(this);
		this.handleChangeStepTimestamp = this.handleChangeStepTimestamp.bind(this);

		this.handleChangeMediaFile = this.handleChangeMediaFile.bind(this);
		this.handleChangeMediaUrl = this.handleChangeMediaUrl.bind(this);
		this.handleChangeMediaName = this.handleChangeMediaName.bind(this);
		this.handleChangeMediaType = this.handleChangeMediaType.bind(this);
		this.addMedia = this.addMedia.bind(this);
		this.deleteMedia = this.deleteMedia.bind(this);
		this.editMedia = this.editMedia.bind(this);
		this.initState = this.initState.bind(this);
		this.state = {
			// name: "",
			// description: "",
			// number_person: 0,
			// prep_time: 0,
			// cook_time: 0,
			// ingredient_sections: [
			// 	{
			// 		name: "",
			// 		ingredients: [""],
			// 	},
			// ],
			// step_sections: [
			// 	{
			// 		name: "",
			// 		steps: [
			// 			{
			// 				timestamp: 0,
			// 				mediaId: -1,
			// 				direction: "",
			// 			},
			// 		],
			// 	},
			// ],
			// medias: [],
			// files: [],
			authorized: false
		};
	}



	componentDidMount() {
		console.log('mount')
		let recipe = null
		let medias = null
		if (this.props.location.state && this.props.location.state.recipe) {
			recipe = this.props.location.state.recipe
			if (recipe.creator_id === this.props.userId) {
				this.load = true;
				medias = this.props.location.state.medias
				if (medias) {
					let params = this.props.match.params;
					axios.get("api/recipe/" + params["recipe_id"] + "/media").then((response) => {
						medias = response.data.medias;
						this.initState(recipe, medias);
					});
				}
				else{
					this.initState(recipe, medias);
				}
			}
			
		}
		else {
			console.log('else')
			let params = this.props.match.params;
			axios.get("api/recipe/" + params["recipe_id"] + "/info").then((response) => {
				recipe = response.data
				if (recipe.creator_id === this.props.userId) {
					this.load = true
					axios.get("api/recipe/" + params["recipe_id"] + "/media").then((response) => {
						medias = response.data.medias;
						this.initState(recipe, medias);
					});
				}
			})
		}


	}

	componentWillReceiveProps(props) {
		if(!this.load){

		console.log('will')
		let recipe = null
		let medias = null
		if (props.location.state && props.location.state.recipe) {

			recipe = props.location.state.recipe
			if (recipe.creator_id === props.userId) {
				medias = props.location.state.medias
				if (medias) {
					let params = props.match.params;
					axios.get("api/recipe/" + params["recipe_id"] + "/media").then((response) => {
						medias = response.data.medias;
						this.initState(recipe, medias);
					});
				}
			}
		}
		else {
			let params = props.match.params;
			axios.get("api/recipe/" + params["recipe_id"] + "/info").then((response) => {
				recipe = response.data
				if (recipe.creator_id === props.userId) {
					axios.get("api/recipe/" + params["recipe_id"] + "/media").then((response) => {
						medias = response.data.medias;
						this.initState(recipe, medias);
					});
				}
			})
		}
	}
	}
		


	initState = (recipe, medias) => {
		this.media_id_map = medias.map((media) => {
			return media.mediaId;
		})

		this.setState({
			name: recipe.name,
			description: recipe.description,
			number_person: recipe.number_person,
			prep_time: recipe.prep_time,
			cook_time: recipe.cook_time,
			ingredient_sections: recipe.ingredient_sections,
			step_sections: recipe.step_sections.map(
				(step_section) => {
					return {
						name: step_section.name,
						steps: step_section.steps.map(
							(step) => {
								return {
									timestamp: step.timestamp,
									mediaId: this.media_id_map.indexOf(step.mediaId),
									direction: step.direction
								}
							}
						)
					}
				}
			),
			medias: medias.map(
				(media) => {
					return {
						type: media.type,
						name: media.name,
						url: media.url,
						mediaId: media.mediaId,
						fileId: -1,
						label: 'Choose an image',
						editing: false
					}
				}
			),
			files: [],
			authorized: true
		}, () => { console.log(this.state) })

	}

	handleChangeSameName = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit
	submitForm = () => {
		// console.log(this.state)
		let data = this.recipe_data_from_form();
		console.log(data)
		axios
			.put("api/recipe/" + this.props.match.params['recipe_id'], data, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Token " + this.props.token,
				},
			})
			.then((response) => {
				this.props.history.push("/recipe/" + response.data.recipe_id);
			});
	};

	recipe_data_from_form = () => {
		let data = new FormData();
		data.append(
			"recipe",
			JSON.stringify({
				name: this.state.name,
				description: this.state.description,
				number_person: parseInt(this.state.number_person),
				prep_time: parseInt(this.state.prep_time),
				cook_time: parseInt(this.state.cook_time),
				ingredient_sections: this.state.ingredient_sections,
				step_sections: this.state.step_sections,
				medias: this.state.medias.map((media) => {
					return {
						type: media.type,
						mediaId: media.mediaId,
						name: media.name,
						url: media.url,
						fileId: media.fileId,
					};
				}),
			})
		);
		console.log(JSON.stringify({
			name: this.state.name,
			description: this.state.description,
			number_person: parseInt(this.state.number_person),
			prep_time: parseInt(this.state.prep_time),
			cook_time: parseInt(this.state.cook_time),
			ingredient_sections: this.state.ingredient_sections,
			step_sections: this.state.step_sections,
			medias: this.state.medias.map((media) => {
				return {
					type: media.type,
					mediaId: media.mediaId,
					name: media.name,
					url: media.url,
					fileId: media.fileId,
				};
			}),
		}))
		data = this.add_images_to_form_data(data, this.state.files);
		return data;
	};

	add_images_to_form_data(data, images) {
		for (var image_index = 0; image_index < images.length; image_index++) {
			data.append("image_" + image_index, images[image_index]);
		}
		return data;
	}

	// Ingredients
	addIngredientSection = () => {
		let tmp = this.state.ingredient_sections;
		tmp.push({
			name: "",
			ingredients: [""],
		});
		this.setState({ ingredient_sections: tmp });
	};

	handleChangeIngredientSectionName = (section_index, event) => {
		let tmp = this.state.ingredient_sections;
		tmp[section_index].name = event.target.value;
		this.setState({ ingredient_sections: tmp });
	};

	handleChangeIngredient = (section_index, ingredient_index, event) => {
		let tmp = this.state.ingredient_sections;
		tmp[section_index].ingredients[ingredient_index] = event.target.value;
		this.setState({ ingredient_sections: tmp });
	};

	deleteIngredientSection = (section_index) => {
		let tmp = this.state.ingredient_sections;
		this.setState({ ingredient_sections: this.removeElementAtIndex(tmp, section_index) });
	};

	addIngredient = (section_index) => {
		let tmp = this.state.ingredient_sections;
		tmp[section_index].ingredients.push("");
		this.setState({ ingredient_sections: tmp });
	};

	deleteIngredient = (section_index, ingredient_index) => {
		let tmp = this.state.ingredient_sections;
		tmp[section_index].ingredients = this.removeElementAtIndex(tmp[section_index].ingredients, ingredient_index);
		this.setState({ ingredient_sections: tmp });
	};

	// Steps

	addStepSection = () => {
		let tmp = this.state.step_sections;
		tmp.push({
			name: "",
			steps: [
				{
					timestamp: 0,
					mediaId: -1,
					direction: "",
				},
			],
		});
		this.setState({ step_sections: tmp });
	};

	handleChangeStepSectionName = (section_index, event) => {
		let tmp = this.state.step_sections;
		tmp[section_index].name = event.target.value;
		this.setState({ step_sections: tmp });
	};

	handleChangeStepDirection = (section_index, step_index, event) => {
		let tmp = this.state.step_sections;
		tmp[section_index].steps[step_index].direction = event.target.value;
		this.setState({ step_sections: tmp });
	};

	handleChangeStepTimestamp = (section_index, step_index, event) => {
		let tmp = this.state.step_sections;
		tmp[section_index].steps[step_index].timestamp = parseInt(event.target.value);
		this.setState({ step_sections: tmp });
	};

	handleChangeStepMediaId = (section_index, step_index, event) => {
		let tmp = this.state.step_sections;
		tmp[section_index].steps[step_index].mediaId = parseInt(event.target.value);
		this.setState({ step_sections: tmp });
	};

	deleteStepSection = (section_index) => {
		let tmp = this.state.step_sections;
		this.setState({ step_sections: this.removeElementAtIndex(tmp, section_index) });
	};

	addStep = (section_index) => {
		let tmp = this.state.step_sections;
		tmp[section_index].steps.push({
			timestamp: 0,
			mediaId: 0,
			direction: "",
		});
		this.setState({ step_sections: tmp });
	};

	deleteStep = (section_index, step_index) => {
		let tmp = this.state.step_sections;
		tmp[section_index].steps = this.removeElementAtIndex(tmp[section_index].steps, step_index);
		this.setState({ step_sections: tmp });
	};

	removeElementAtIndex = (arr, index) => {
		return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
	};

	//Image handler
	handleChangeMediaFile = (event, index) => {
		if (event.target.files && event.target.files.length !== 0) {
			let medias = this.state.medias;
			let files = this.state.files;
			if (medias[index].fileId === -1) {
				files.push(event.target.files[0]);
				medias[index].fileId = files.length - 1;
			} else {
				files[medias[index].fileId] = event.target.files[0];
			}
			medias[index].label = event.target.files[0].name;
			this.setState({
				files: files,
				medias: medias,
			});
		}
	};

	handleChangeMediaUrl = (event, index) => {
		let tmp = this.state.medias;
		tmp[index].url = event.target.value;
		this.setState({ medias: tmp });
	};

	handleChangeMediaType = (event, index) => {
		let tmp = this.state.medias;
		tmp[index] = {
			type: parseInt(event.target.value),
			name: tmp[index].name,
			url: "",
			fileId: -1,
			mediaId: -1,
			label: "Choose an image",
			editing: true
		};

		this.setState({ medias: tmp });
	};

	handleChangeMediaName = (event, index) => {
		let tmp = this.state.medias;
		tmp[index].name = event.target.value;
		this.setState({ medias: tmp });
	};

	addMedia = () => {
		let tmp = this.state.medias;
		tmp.push({
			type: 0,
			name: "",
			url: "",
			fileId: -1,
			mediaId: -1,
			label: "Choose an image",
			editing: true
		});
		this.setState({ medias: tmp });
	};

	deleteMedia = (index) => {
		let medias = this.state.medias;
		let files = this.state.files;
		if (medias[index].fileId !== -1) {
			files = this.removeElementAtIndex(files, medias[index].fileId);
		}
		medias = this.removeElementAtIndex(medias, index);
		this.setState({ medias: medias, files: files }, () => {
			console.log(this.state);
		});
	};

	editMedia = (index) => {
		let medias = this.state.medias;
		medias[index].editing = true
		medias[index].mediaId = -1
		this.setState({ medias: medias })
	}


	render() {
		return (
			<Container className="shadow custom-container" fluid="sm">
				<SigninRequired
					content={
						this.state.authorized ? <EditRecipe
							handleChangeSameName={this.handleChangeSameName}
							submitForm={this.submitForm}
							addIngredientSection={this.addIngredientSection}
							addIngredient={this.addIngredient}
							deleteIngredient={this.deleteIngredient}
							deleteIngredientSection={this.deleteIngredientSection}
							handleChangeIngredientSectionName={this.handleChangeIngredientSectionName}
							handleChangeIngredient={this.handleChangeIngredient}
							addStepSection={this.addStepSection}
							addStep={this.addStep}
							deleteStep={this.deleteStep}
							deleteStepSection={this.deleteStepSection}
							handleChangeStepSectionName={this.handleChangeStepSectionName}
							handleChangeStepMediaId={this.handleChangeStepMediaId}
							handleChangeStepTimestamp={this.handleChangeStepTimestamp}
							handleChangeStepDirection={this.handleChangeStepDirection}
							name={this.state.name}
							description={this.state.description}
							number_person={this.state.number_person}
							prep_time={this.state.prep_time}
							cook_time={this.state.cook_time}
							ingredient_sections={this.state.ingredient_sections}
							step_sections={this.state.step_sections}
							medias={this.state.medias}
							units={this.state.units}
							deleteMedia={this.deleteMedia}
							addMedia={this.addMedia}
							handleChangeMediaFile={this.handleChangeMediaFile}
							handleChangeMediaUrl={this.handleChangeMediaUrl}
							handleChangeMediaName={this.handleChangeMediaName}
							handleChangeMediaType={this.handleChangeMediaType}
							editMedia={this.editMedia}
						></EditRecipe>
							: <NotAuthorizedPage></NotAuthorizedPage>
					}
				></SigninRequired>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, () => { })(withRouter(EditRecipeContainer));
