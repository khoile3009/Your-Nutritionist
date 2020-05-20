import React from 'react';
import './RecipeCard.css';
import { Row, Col } from 'react-bootstrap'


const RecipeCard = (props) => {
    return <div className='card' 
    style={{backgroundImage: "url('" + props.thumbnail + "')"}} 
    onClick={props.toRecipePage}>
        <div className='recipe-info' >
            <Row>
                <Col className='info-container'>
                    <p className='info'>
                        {props.number_person} {props.number_person <= 1 ? ' person' : ' people'}
                    </p>
                </Col>
                <Col className='info-container'>
                    <p className='info'>
                        {props.cook_time + ' minutes'} 
                    </p>
                </Col>
                <Col className='info-container'>
                    <p className='info'>
                        {props.likes + ' likes'} 
                    </p>
                </Col>
            </Row>
        </div>
        <p className='recipe-name'>{props.name}</p>
    </div>
}

export default RecipeCard;