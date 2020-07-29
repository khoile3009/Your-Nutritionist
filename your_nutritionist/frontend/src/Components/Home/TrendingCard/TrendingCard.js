import React from 'react';
import './TrendingCard.scss';
import { Row, Col } from 'react-bootstrap';

const TrendingCard = (props) => {
	let rank_color = [ '#ff9d00', '#bd48e8', '#4199e0', '#29e67b', '#e3e3e3' ];
	let ranktxt_color = [ '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#000000' ];
	return (
		<div className="trending-card-wrapper card clickable" onClick={props.toTrendingRecipe}>
			<div style={{ background: rank_color[props.rank - 1] }} className="trending-banner-wrapper">
				<div style={{ color: ranktxt_color[props.rank - 1] }} className="trending-banner">
					{props.rank}
				</div>
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
