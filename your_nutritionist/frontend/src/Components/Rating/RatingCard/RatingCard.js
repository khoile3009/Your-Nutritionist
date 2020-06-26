import React from 'react';
import './RatingCard.css'
import { Link } from 'react-router-dom'

const RatingCard = (props) =>{
    return <div className='card rating-card'>
        <p><span id="bold">Rating:</span> {props.rating.rating}</p>
        {console.log(props.rating)}
        <p><span id="bold">User:</span>
            <Link to={'/user/'+props.rating.user_id}>
                {props.rating.name}
            </Link>
        </p>
        <p><span id="bold">Comment:</span> {props.rating.comment}</p>
    </div>
}

export default RatingCard