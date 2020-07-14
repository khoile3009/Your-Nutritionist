import React, { Component } from "react";
import axios from "../../axios-orders";

import RecipeShow from "../../Components/RecipeShow/RecipeShow";
import NullPage from "../../Components/NullPage/NullPage";
import RecipeRatingContainer from "../RecipeRating/RecipeRatingContainer";
import MediaShowContainer from "../MediaShow/MediaShowContainer";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class RecipeShowContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seek: null,
		};
		this.getRatings = this.getRatings.bind(this);
		this.getMedias = this.getMedias.bind(this);
		this.goToSecondOnMedia = this.goToSecondOnMedia.bind(this);
		this.countMedias = this.countMedias.bind(this);
	}

	componentDidMount() {
		this.mediaContainer = React.createRef();
		let params = this.props.match.params;

		axios.get("api/recipe/" + params["recipe_id"] + "/info").then((response) => {
			this.setState({ recipe: response.data });
			this.getRatings();
			this.getMedias();
		});
		this.toEditRecipe = this.toEditRecipe.bind(this);
	}

	getRatings() {
		let params = this.props.match.params;

		axios.get("api/recipe/" + params["recipe_id"] + "/rate/all").then((response) => {
			this.setState({ ratings: response.data.ratings });
		});
	}

	getMedias() {
		let params = this.props.match.params;
		axios.get("api/recipe/" + params["recipe_id"] + "/media").then((response) => {
			this.setState({ medias: response.data.medias });
		});
	}

	goToSecondOnMedia = (time, mediaId) => {
		console.log("recipe_show");
		this.setState({ seek: { time: time, mediaId: mediaId } });
	};

	countMedias = (getMedias) => {
		let keys = Object.keys(getMedias);
		console.log(keys);
		for (let i = 0, len = keys.length; i << len; i++) {
			console.log(getMedias[keys[i]]);
		}
	};

	toEditRecipe = () => {
		this.props.history.push({pathname: "/recipe/" + this.props.match.params["recipe_id"] + "/edit", state: {recipe: this.state.recipe, medias: this.state.medias}});
	};

	render() {
		// console.log(this.props);
		console.log(this.state.recipe)
		return this.state.recipe ? (
			<>
				{this.state.medias && this.state.medias.length != 0? (
					<MediaShowContainer
						medias={this.state.medias}
						seek={this.state.seek}
						rotateMediaLeft={this.rotateMediaLeft}
						rotateMediaRight={this.rotateMediaRight}
					></MediaShowContainer>
				) : null}

				<Container className="shadow custom-container recipe" fluid="sm">
					<RecipeShow
						recipe={this.state.recipe}
						goToSecondOnMedia={this.goToSecondOnMedia}
						is_creator={this.props.token ? this.state.recipe.creator_id == this.props.userId : false}
						toEditRecipe={this.toEditRecipe}
					></RecipeShow>
					<hr></hr>
					<RecipeRatingContainer
						ratings={this.state.ratings}
						recipeId={this.props.match.params["recipe_id"]}
						getRatings={this.getRatings}
						creatorId={this.state.recipe.creator_id}
					></RecipeRatingContainer>
				</Container>
			</>
		) : (
			<NullPage></NullPage>
		); //Update this to null page
	}
}
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};
export default connect(mapStateToProps, () => {})(withRouter(RecipeShowContainer));
