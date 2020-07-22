import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewFeedMedia from './NewFeedMedia.js';
import './NewFeedCard.scss';
import { ImageCard, VideoCard } from '../../Components/Recipe/MediaCard/MediaCard';

const NewFeedCard = (props) => {
	console.log(props);
	return (
		<div className="card newfeedcard-wrapper container">
			<div className="newfeedcard">
				<div className="profilepic-newfeed" style={{ backgroundImage: "url('" + props.post.profilepic + "')" }} />
				<div className="profile-newfeed">
					<a onClick={props.to_creator}>{props.post.username}</a>
				</div>
				<div className="content-newfeed">{props.post.content}</div>
				<div className="media-newfeed" />
			</div>
		</div>
	);
};

export default NewFeedCard;
