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
        <Button className="upvote">Upvote</Button>
    </div>
}

export default RatingCard