import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './RatingHeader.css';
import RatingFormCard from '../RatingFormCard/RatingFormCard';
import Popup from 'reactjs-popup';
import StarRating from '../../StarRating/StarRating';
const RatingHeader = (props) => {
	console.log(props);
	return (
		<div className="rating-header">
			<Row>
				<Col md="auto" className="rate">
					<div className="subtitle">Comments and ratings: &nbsp;</div>
				</Col>
				{/* <Col className="subtitle" id="overall-rating">
					<span>{props.numberRatings + ' ratings in total'}</span>
				</Col> */}
				<Col xs={6} className="star-rating-wrapper">
					<span id="rating-total">{props.numberRatings + ' ratings in total '}</span>
					{/* <p className="subtitle">{props.overallRatingScore}</p> */}
					<StarRating rating={props.totalRating / props.numberRatings} />
				</Col>
				{props.canRate ? (
					<Col md="auto" className="add-comment-wrapper">
						<Button className="add-comment" onClick={props.toggleFormCard}>
							{props.isRated ? 'Edit comment' : 'Add comment'}
						</Button>
					</Col>
				) : null}
			</Row>
		</div>
	);
};

export default RatingHeader;
