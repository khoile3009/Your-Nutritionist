import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './RatingFormCard.css'
const RatingFormCard = (props) => {
    console.log(props)
    return <Form className='card' onSubmit={props.submitRating}>
            <Form.Group controlId="formBasicRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" placeholder="Enter rating" value={props.your_rating.rating} onChange={props.handleRatingChange}/>
                <Form.Label>Comment</Form.Label>
                <Form.Control as='textarea' rows='3' placeholder="Comment" value={props.your_rating.comment} onChange={props.handleCommentChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
        </Button>
    </Form>
}
export default RatingFormCard 