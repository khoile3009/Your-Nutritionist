import React, { Component } from "react";
import { Button } from "react-bootstrap";
import RatingHeader from "../../../Components/Recipe/Rating/RatingHeader/RatingHeader";
import RatingCard from "../../../Components/Recipe/Rating/RatingCard/RatingCard";
import RatingFormCard from "../../../Components/Recipe/Rating/RatingFormCard/RatingFormCard";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

class RecipeRatingContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showForm: false,
			your_rating: {
				rated: false,
				rating: "",
				comment: "",
			},
			chk: {
				commentContentChk: null,
				commentRatingChk: null,
			},
		};
		this.toggleFormCard = this.toggleFormCard.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.submitRating = this.submitRating.bind(this);
		this.getIsRated = this.getIsRated.bind(this);
		this.canRate = this.canRate.bind(this);
		this.expandRatingCardTrigger = this.expandRatingCardTrigger.bind(this);

		// Input validations
		this.validateCommentContent = this.validateCommentContent.bind(this);
		this.validateCommentRating = this.validateCommentRating.bind(this);
	}

	componentDidMount() {
		if (this.canRate()) {
			this.getIsRated();
		}
	}

	componentWillReceiveProps(props) {
		if (props.ratings) {
			this.setState({
				cardExpands: props.ratings.map((rating) => {
					return false;
				}),
			});
		}
	}

	toggleFormCard = () => {
		this.setState({ showForm: !this.state.showForm });
	};

	handleRatingChange = (event) => {
		this.setState({
			your_rating: {
				...this.state.your_rating,
				rating: event.target.value,
			},
		});
	};

	handleCommentChange = (event) => {
		this.setState({
			your_rating: {
				...this.state.your_rating,
				comment: event.target.value,
			},
		});
	};

	getIsRated = () => {
		let headers = {
			"Content-Type": "application/json",
			Authorization: "Token " + this.props.token,
		};
		axios
			.get("/api/recipe/" + this.props.recipeId + "/rate", { headers: headers })
			.then((response) => {
				if (response.data.rated) {
					console.log(response.data);
					this.setState({ your_rating: response.data });
				}
			});
	};

	submitRating = () => {
		// event.preventDefault();
		let headers = {
			"Content-Type": "application/json",
			Authorization: "Token " + this.props.token,
		};
		let data = {
			rating: parseInt(this.state.your_rating.rating),
			comment: this.state.your_rating.comment,
		};
		let url = "/api/recipe/" + this.props.recipeId + "/rate";
		if (this.state.your_rating.rated) {
			axios.put(url, data, { headers: headers }).then((response) => {
				this.props.getRatings();

				this.toggleFormCard();
			});
		} else {
			axios.post(url, data, { headers: headers }).then((response) => {
				this.props.getRatings();
				this.setState({
					your_rating: {
						...this.state.your_rating,
						rated: true,
					},
				});
				this.toggleFormCard();
			});
		}
	};

	canRate = () => {
		return this.props.userId && this.props.creatorId != this.props.userId;
	};

	expandRatingCardTrigger = (index) => {
		let cardExpands = this.state.cardExpands;
		cardExpands[index] = !cardExpands[index];
		this.setState({ cardExpands: cardExpands });
	};

	// Input validation functions

	updateErrorWithCallback = (callback) => {
		this.setState(
			{
				chk: {
					commentContentChk: this.validateCommentContent(),
				},
			},
			() => {
				if (this.isErrorFree()) {
					callback();
				}
			}
		);
	};

	isErrorFree = () => {
		return this.state.chk.commentContentChk;
	};

	validateCommentContent = () => {
		return this.state.your_rating.comment !== "";
	};

	validateCommentRating = () => {
		return null;
	};

	submitRatingHandler = (event) => {
		event.preventDefault();
		this.updateErrorWithCallback(this.submitRating);
	};

	render() {
		console.log(this.props);
		return (
			<>
				<RatingHeader
					totalRating={this.props.totalRating}
					numberRatings={this.props.numberRatings}
					toggleFormCard={this.toggleFormCard}
					isRated={this.state.your_rating.rated}
					canRate={this.canRate()}
				></RatingHeader>
				{this.state.showForm ? (
					<RatingFormCard
						error={this.props.error}
						chk={this.state.chk}
						your_rating={this.state.your_rating}
						handleCommentChange={this.handleCommentChange}
						handleRatingChange={this.handleRatingChange}
						submitRating={this.submitRatingHandler}
					></RatingFormCard>
				) : null}
				{this.props.ratings ? (
					this.props.ratings.map((rating, index) => {
						return (
							<RatingCard
								rating={rating}
								expandRatingCardTrigger={() => {
									this.expandRatingCardTrigger(index);
								}}
								expand={this.state.cardExpands[index]}
							></RatingCard>
						);
					})
				) : (
					<h1>No rating</h1>
				)}
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

export default connect(mapStateToProps, null)(RecipeRatingContainer);
