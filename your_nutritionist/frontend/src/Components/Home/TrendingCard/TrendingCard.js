import React from "react";
import "./TrendingCard.scss";
import { Row, Col } from "react-bootstrap";

// New props.recipe
// {
//             "recipe_id": 20,
//             "creator_id": 1,
//             "creator_name": "Khoi Le",
//             "recipe_name": "",
//             "number_upvotes": 0,
//             "number_ratings": 0,
//             "total_ratings": null,
//             "created_date": "2020-06-25",
//             "number_visits": 18
//         }
const TrendingCard = (props) => {
	let rank_color = ["#ff9d00", "#bd48e8", "#4199e0", "#29e67b", "#e3e3e3"];
	let ranktxt_color = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000"];
	return (
		<div className="trending-card-wrapper card clickable" onClick={props.toTrendingRecipe}>
			<div
				style={{ background: rank_color[props.rank - 1] }}
				className="trending-banner-wrapper"
			>
				<div style={{ color: ranktxt_color[props.rank - 1] }} className="trending-banner">
					{props.rank}
				</div>
			</div>
			<div className="trending-recipe">{props.recipe.recipe_name}</div>
			<div className="trending-username">
				by{" "}
				<span className="link" onClick={props.toTrendingCreator}>
					{props.recipe.creator_name}
				</span>{" "}
				on {props.recipe.created_date}
			</div>
			<div className="trending-stats social-fn-wrapper">
				<div className="social-fn">
					<i className="material-icons" style={{ color: "#0390fc" }}>
						visibility
					</i>
					&nbsp;
					{props.recipe.number_visits.toString().length < 3
						? "0".repeat(3 - props.recipe.number_visits.toString().length) +
						  props.recipe.number_visits
						: props.recipe.number_visits}
				</div>

				<div className="social-fn">
					<i className="material-icons" style={{ color: "#E97272" }}>
						favorite
					</i>
					&nbsp;
					{props.recipe.number_upvotes.toString().length < 3
						? "0".repeat(3 - props.recipe.number_upvotes.toString().length) +
						  props.recipe.number_upvotes
						: props.recipe.number_upvotes}
				</div>

				<div className="social-fn">
					<i className="material-icons" style={{ color: "rgb(255, 174, 0)" }}>
						grade
					</i>
					&nbsp;
					{props.recipe.number_ratings}
				</div>
			</div>
		</div>
	);
};

export default TrendingCard;
