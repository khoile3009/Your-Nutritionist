import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./RatingFormCard.scss";
const RatingFormCard = (props) => {
	console.log(props);
	return (
		<Form className="card" onSubmit={props.submitRating}>
			<Form.Group controlId="formBasicRating">
				<Form.Label className="rating-lbl">Rating</Form.Label>
				<Form.Control
					className="rating-score input-field"
					type="number"
					placeholder="Enter rating"
					value={props.your_rating.rating}
					onChange={props.handleRatingChange}
				/>
				<Form.Label className="rating-lbl">Comment</Form.Label>
				<Form.Control
					className="rating-content input-field"
					as="textarea"
					rows="3"
					placeholder="Comment"
					value={props.your_rating.comment}
					onChange={props.handleCommentChange}
				/>
				{props.chk.commentContentChk === false ? (
					<Form.Text style={{ padding: "1rem" }} className="error">
						Comment content cannot be blank.
					</Form.Text>
				) : null}
			</Form.Group>
			<Row>
				<Col></Col>
				<Col md="auto" xs="auto">
					<Button className="rating-submit-btn" type="submit">
						Submit
					</Button>
				</Col>
				<Col></Col>
			</Row>
		</Form>
	);
};
export default RatingFormCard;
