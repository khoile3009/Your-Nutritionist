import React, { Component } from "react";
import axios from "../../../axios-orders";

import RecipeShow from "../../../Components/Recipe/RecipeShow/RecipeShow";
import NullPage from "../../../Components/Util/NullPage/NullPage";
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
		this.checkUpvote = this.checkUpvote.bind(this);
		this.upvote = this.upvote.bind(this);
		this.unUpvote = this.unUpvote.bind(this);
	}

	componentDidMount() {
		this.mediaContainer = React.createRef();
		let params = this.props.match.params;

		axios.get("api/recipe/" + params["recipe_id"] + "/info").then((response) => {
			this.setState({ recipe: response.data });
			
			this.getMedias();
			// Turn this back after migrating to gcloud
			// this.getRatings();
			// this.checkUpvote();
		});
		this.toEditRecipe = this.toEditRecipe.bind(this);
	}

	getRatings = () => {
		let params = this.props.match.params;

		axios.get("api/recipe/" + params["recipe_id"] + "/rate/all").then((response) => {
			let totalRating = 0;
			response.data.ratings.map((rating) => {
				totalRating += rating.rating
			})
			this.setState({ ratings: response.data.ratings, totalRating: totalRating, numberRatings: response.data.ratings.length },
			 ()=> {
				this.checkUpvote();
			 }	
			);
		});
		
	}

	getMedias = () => {
		let params = this.props.match.params;
		axios.get("api/recipe/" + params["recipe_id"] + "/media").then((response) => {
			this.setState({ medias: response.data.medias }, ()=> {this.getRatings()});
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

	checkUpvote = () => {
		if (this.props.token) {
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
            axios.get('api/recipe/' + this.props.match.params["recipe_id"] + '/upvoted', {
                    headers: headers
                })
                .then(
                    (response) => {
                        this.setState({
                            upvoted: response.data.upvoted
                        })

                    }
                )
                .catch(
                    (err) => {}
                )
        }

	}

	upvote = () => {
		if (this.props.token) {
            let data = null
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.props.token
            }
            let url = 'api/recipe/' + this.props.match.params["recipe_id"] + '/upvote';
            axios.post(url, data, {
                    headers: headers
                })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
				})
			}
			this.setState({
				upvoted: true
			})
	}
	
	unUpvote = () => {
		let data = null
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.props.token
        }
        let url = 'api/recipe/' + this.props.match.params["recipe_id"] + '/upvote';
        axios.delete(url, {
                headers: headers
            })
            .then(response => {
                console.log(response)
                this.setState({
                    upvoted: false
                })
            })
            .catch(err => {
                console.log(err)
			})
			this.setState({
				upvoted: false
			})
	}

	render() {
		// console.log(this.props);
		console.log(this.props)
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
						logged_in={(this.props.token)}
						is_creator={this.props.token ? this.state.recipe.creator_id == this.props.userId : false}
						upvoted={this.state.upvoted}
						upvote={this.upvote}
						unUpvote={this.unUpvote}
						toEditRecipe={this.toEditRecipe}
					></RecipeShow>
					<hr></hr>
					<RecipeRatingContainer
						totalRating={this.state.totalRating}
						numberRatings={this.state.numberRatings}
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
