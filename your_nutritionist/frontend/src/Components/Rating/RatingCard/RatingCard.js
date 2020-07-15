import React from 'react';
import './RatingCard.css'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Button, FormFile } from "react-bootstrap";
import StarRating from '../../StarRating/StarRating'
const RatingCard = (props) =>{
    console.log(props)
    return <div className='card rating-card'>
        <div className="comment-profile" style={{backgroundImage:"url('" + props.rating.profilepic + "')"}}>
        </div>
        <div className="comment-user">
            <p>
            <Link to={'/user/'+props.rating.user_id}>
                {props.rating.name}
            </Link> said on 
            </p>
            <p>
            {props.rating.comment}
            </p>
        </div>
        <div className="comment-rating">
            <StarRating rating={props.rating.rating}></StarRating>
        </div>
        {/* <div className="see-more-trigger">
            <span id="">See more bitches</p>
        </div> */}
        {props.rating.comment.length > 500
                ? <div className="see-more-trigger">
                        <span id="see-more-active">See more</span>
                    </div>
                    : null
                }
    </div>
}

export default RatingCard