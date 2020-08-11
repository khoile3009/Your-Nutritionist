import React from "react";
import "./RecipeCard.scss";
import { Row, Col } from "react-bootstrap";

const RecipeCard = (props) => {
	return (
		<div className="recipe-card-wrapper">
			<div className="recipe-card card clickable" onClick={props.toRecipePage}>
				<div
					className="recipe-image"
					style={
						props.thumbnail == ""
							? {
									backgroundImage:
										"url('https://storage.googleapis.com/your-nutritionist-cdn/header-bg.jpg')",
									backgroundColor:
										"rgb(" +
										Math.floor(Math.random() * 255) +
										"," +
										Math.floor(Math.random() * 255) +
										"," +
										Math.floor(Math.random() * 255) +
										")",
							  }
							: {
									backgroundImage: "url('" + props.thumbnail + "')",
									backgroundColor:
										"rgb(" +
										Math.floor(Math.random() * 255) +
										"," +
										Math.floor(Math.random() * 255) +
										"," +
										Math.floor(Math.random() * 255) +
										")",
							  }
					}
				/>
				<div className="recipe-name">{props.name}</div>
				<div className="recipe-info">
					<div className="recipe-servings">
						<p className="info">
							<i className="material-icons">face</i>&nbsp;
							{props.number_person}{" "}
							{props.number_person <= 1 ? " person" : " serving(s)"}
						</p>
					</div>
					<div className="recipe-cooktime">
						<p className="info">
							<i className="material-icons">watch_later</i>{" "}
							{props.cook_time + " mins"}
						</p>
					</div>
					<div className="recipe-favorites">
						<p className="info">
							<i class="material-icons">favorite</i>&nbsp;
							{props.likes + " favorites"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
