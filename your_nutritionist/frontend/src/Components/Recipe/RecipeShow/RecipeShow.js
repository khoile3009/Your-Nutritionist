import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./RecipeShow.css";
import { IngredientSections, StepsSections } from "./Subsections/Subsections";
import { Link } from "react-router-dom";

const RecipeShow = (props) => {
    console.log(props.recipe);
    return (
        <>
            <div className="title-wrapper">
                <Row>
                    <Col md="auto" className="title text-left">
                        <span id="title">{props.recipe.name}</span>
                    </Col>
                    <Col md="auto" className="upvote-wrapper">
                        {props.logged_in && !props.is_creator ? (
                            props.recipe.upvoted ? (
                                <Button className="upvote" onClick={props.unUpvote}>
                                    <i class="material-icons" style={{ color: "rgb(201, 0, 44)" }}>
                                        favorite
                                    </i>
                                </Button>
                            ) : (
                                <Button className="upvote" onClick={props.upvote}>
                                    <i class="material-icons">favorite_border</i>
                                </Button>
                            )
                        ) : null}
                    </Col>
                    {props.is_creator ? (
                        <Col className="edit-btn-wrapper" md="auto">
                            <Button className="edit-btn" onClick={props.toEditRecipe}>
                                🖉 Edit Recipe
                            </Button>
                        </Col>
                    ) : null}
                </Row>
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
