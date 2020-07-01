import React from 'react';
import './RatingCard.css'
import { Link } from 'react-router-dom'

const RatingCard = (props) =>{
    return <div className='card rating-card'>
        <p><span id="bold">Rating: &nbsp;</span> {props.rating.rating}</p>
        {console.log(props.rating)}
        <p><span id="bold">User: &nbsp;</span>
            <Link to={'/user/'+props.rating.user_id}>
                {props.rating.name}
            </Link>
        </p>
        <p><span id="bold">Comment: &nbsp;</span> {props.rating.comment}</p>
    </div>
}

export default RatingCard