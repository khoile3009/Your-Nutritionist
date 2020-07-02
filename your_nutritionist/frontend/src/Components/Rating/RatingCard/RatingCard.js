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
            John Doe @ user_id said on 2020-06-09
            </p>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>
    </div>
}

export default RatingCard