import React from 'react';
import './TrendingCard.scss';
import { Row, Col } from 'react-bootstrap';

const TrendingCard = (props) => {
	console.log(props);
	return (
		<div className="trending-card-wrapper card clickable">
			<div className="trending-banner-wrapper">
				<div className="trending-banner" />1
			</div>
			<div className="trending-recipe">{props.recipe.recipe_name}</div>
			<div className="trending-username">
				by <a href={'/user/' + props.recipe.id}>{props.recipe.creator_name}</a> on {props.recipe.recipe_creation_date}
			</div>
			<div className="trending-stats social-fn-wrapper">
				<div className="social-fn">
					<i className="material-icons" style={{ color: '#E97272' }}>
						favorite
					</i>&nbsp;
					{props.recipe.recipe_favorites}
				</div>
				<div className="social-fn">
					<i className="material-icons" style={{ color: 'rgb(255, 174, 0)' }}>
						grade
					</i>&nbsp;
					{props.recipe.recipe_ratings}
				</div>
			</div>
		</div>
	);
};

export default TrendingCard;
