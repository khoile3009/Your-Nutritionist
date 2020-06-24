import React from 'react';
import './RatingCard.css'
const RatingCard = (props) =>{
    return <div className='card rating-card'>
        <p><span id="bold">Rating:</span> {props.rating.rating}</p>
        <p><span id="bold">User:</span> {props.rating.name}</p>
        <p><span id="bold">Comment:</span> {props.rating.comment}</p>
    </div>
}

export default RatingCard