import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './RecipeShow.css';
import { IngredientSections, StepsSections } from './Subsections/Subsections';
import { Link } from 'react-router-dom';

const RecipeShow = (props) => {
    console.log(props.recipe)
    return <Container className='shadow  custom-container' fluid='sm'>
        <div className='title-wrapper'>
            <p className='title text-left'>{props.recipe.name}</p>
            <p>
                Created by
                <Link to={'/user/' + props.recipe.creator_id}>
                    {' ' + props.recipe.creator_username + ' '} 
                </Link>
                {'on ' + props.recipe.create_date}


            </p>
    
        </div>

        <Row>
            <Col><p className='subtitle text-left'>{props.recipe.number_person} servings | Prep Time: {props.recipe.prep_time} minutes  | Cook Time: {props.recipe.cook_time} minutes</p></Col>
        </Row>

        <hr></hr>
        <p className='text-left section-name'>Description</p>
        <p className='text-left description'>{props.recipe.description}</p>

        <hr></hr>
        <Row>
            <Col xs>
                <IngredientSections ingredient_sections={props.recipe.ingredient_sections}></IngredientSections>
            </Col>
            <Col xs={8}>
                <StepsSections step_sections={props.recipe.step_sections}></StepsSections>
            </Col>
        </Row>


    </Container>
}



export default RecipeShow