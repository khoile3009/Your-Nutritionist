import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import RecipeCard from "../../../Components/Recipe/RecipeCard/RecipeCard";
import "./RecipeList.css";

class RecipeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: props.recipes,
		};
		this.toRecipePage = this.toRecipePage.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({ recipes: props.recipes });
	}

	toRecipePage(recipe_id) {
		this.props.history.push("/recipe/" + recipe_id);
	}

	render() {
		console.log(this.state.recipes);
		let recipe_cards = [];
		let page_navigators = [];
		if (this.state.recipes.length !== 0) {
			let section = (this.props.page - 1) % 5;
			let recipes = [];

			if (section * 10 < this.state.recipes.length) {
				recipes = this.state.recipes.slice(section * 10, Math.min(this.state.recipes.length, section * 10 + 10));
			}
			for (var row_index = 0; row_index < Math.round(recipes.length); row_index++) {
				let recipes_row = [];
				let num_col = Math.min(2, recipes.length - row_index * 2);
				for (var col_index = 0; col_index < num_col; col_index++) {
					let recipe = recipes[row_index * 2 + col_index];
					recipes_row.push(

							<RecipeCard
								thumbnail={recipe.thumbnail}
								name={recipe.name}
								recipe_id={recipe.recipe_id}
								number_person={recipe.number_person}
								cook_time={recipe.cook_time}
								likes={recipe.likes}
								toRecipePage={() => {
									this.toRecipePage(recipe.recipe_id);
								}}
							></RecipeCard>

					);
				}
				if (num_col === 1) {
					recipes_row.push(

							<div className="filler"></div>

					);
				}
				recipe_cards.push(<div className="recipe-row">{recipes_row}</div>);
			}
			if (this.props.page) {
				console.log(this.props.page);
				let page_min = Math.max(1, this.props.page - 2);
				let page_block_start = Math.floor((this.props.page - 1) / 5) * 5;
				let page_max = this.props.page + 2;
				console.log(page_max);
				if (this.state.recipes.length < 50) {
					page_max = Math.max(Math.min(this.props.page + 2, page_block_start + Math.ceil(this.state.recipes.length / 10)), this.props.page);
				}
				for (let i = page_min; i <= page_max; i++) {
					page_navigators.push(
						<div className="page-num-wrapper">
							<Button
								onClick={() => {
									this.props.toPage(i);
								}}
								variant={this.props.page === i ? "secondary" : "light"}
							>
								{i}
							</Button>
						</div>
					);
				}
			}
		} else {
			recipe_cards = <h3 style={{ color: "#757575" }}>No recipe</h3>;
		}
		return (
			<>
				{recipe_cards}
				<div className="page-navigator">{page_navigators}</div>
			</>
		);
	}
}

export default withRouter(RecipeList);
