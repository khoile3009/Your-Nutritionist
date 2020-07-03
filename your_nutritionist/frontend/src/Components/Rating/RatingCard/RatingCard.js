import React from 'react';
import './RatingCard.css'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Button, FormFile } from "react-bootstrap";

const RatingCard = (props) =>{
    return <div className='card rating-card'>
        <div className="comment-profile">

        </div>
        <div className="comment-user">
            <p>
            {console.log(props.rating)}
            <Link to={'/user/'+props.rating.user_id}>
                {props.rating.name}
            </Link> said on 
            </p>
            <p>
            {props.rating.comment}
            </p>
        </div>
        <div className="comment-rating">
            Placeholder
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