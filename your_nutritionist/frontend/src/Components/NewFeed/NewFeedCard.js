import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewFeedMedia from './NewFeedMedia.js';
import './NewFeedCard.scss';
import { ImageCard, VideoCard } from '../../Components/Recipe/MediaCard/MediaCard';

const NewFeedCard = (props) => {
	console.log(props);
	return (
		<div className="card newfeedcard-wrapper container">
			<div
				className="profilepic-newfeed clickable"
				onClick={props.toCreator}
				style={{
					backgroundImage: "url('" + props.post.profilepic + "')"
				}}
			/>
			<div className="username-newfeed">
				<a href="#" onClick={props.toCreator}>
					{props.post.username}
				</a>
			</div>
			<div className="content-newfeed-wrapper">
				<div className="text-content-newfeed">{props.post.content}</div>
				<div className="media-newfeed" />
			</div>
			<div className="social-fn-wrapper">
				<div className="social-fn">
					<i className="material-icons" style={{ color: '#E97272' }}>
						favorite
					</i>
					&nbsp;
					{props.post.likes}
				</div>
				<div className="social-fn">
					<i className="material-icons" style={{ color: '#4BC8AE' }}>
						comment
					</i>
					&nbsp;
					{props.post.comments}
				</div>
				<div className="social-fn">
					<i className="material-icons" style={{ color: 'rgb(255, 174, 0)' }}>
						share
					</i>
				</div>
			</div>
		</div>
	);
};

export default NewFeedCard;
