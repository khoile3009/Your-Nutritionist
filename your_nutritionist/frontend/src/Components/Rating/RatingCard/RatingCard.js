import React from 'react';
import './RatingCard.css'
const RatingCard = (props) =>{
    return <div className='card rating-card'>
        <p>{props.rating.rating}</p>
        <p>{props.rating.name}</p>
        <p>{props.rating.comment}</p>
    </div>
}

export default RatingCard