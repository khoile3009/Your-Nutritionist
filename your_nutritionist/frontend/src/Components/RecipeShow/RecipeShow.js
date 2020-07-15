import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./RecipeShow.css";
import { IngredientSections, StepsSections } from "./Subsections/Subsections";
import { Link } from "react-router-dom";

const RecipeShow = (props) => {
	console.log(props.recipe);
	return (
		<>
			<div className="title-wrapper">
				<Row>
					<Col md="auto" className="title text-left">{props.recipe.name}</Col>
					<Col className="upvote-wrapper">{(props.logged_in && !props.is_creator)
				?
				props.upvoted ? <Button className="upvote" onClick={props.unUpvote}>Upvoted</Button> : <Button className="upvote"  onClick={props.upvote}><i class="material-icons">favorite</i></Button>
				:null
				}</Col>
				</Row>
				
				{props.is_creator ? (
					<Button
						onClick={props.toEditRecipe}
						style={{
							fontSize: "12pt",
							margin: "1rem 0 1rem 0",
							fontFamily: "Catamaran",
							background: "teal",
							float: "right",
						}}
					>
						🖉 Edit Recipe
					</Button>
				) : null}
				<p>
					Created by
					<Link to={"/user/" + props.recipe.creator_id}>{" " + props.recipe.creator_username + " "}</Link>
					{"on " + props.recipe.create_date}
				</p>
			</div>

			<Row>
				<Col>
					<p className="subtitle text-left">
						{props.recipe.number_person} servings | Prep Time: {props.recipe.prep_time} minutes | Cook Time: {props.recipe.cook_time} minutes
					</p>
				</Col>
			</Row>

			<hr></hr>
			<p className="text-left section-name">Description</p>
			<p className="text-left description">{props.recipe.description}</p>

			<hr></hr>

			
			<Row>
				<Col xs>
					<IngredientSections ingredient_sections={props.recipe.ingredient_sections}></IngredientSections>
				</Col>
				<Col xs={8}>
					<StepsSections step_sections={props.recipe.step_sections} goToSecondOnMedia={props.goToSecondOnMedia}></StepsSections>
				</Col>
			</Row>
		</>
	);
};

export default RecipeShow;
