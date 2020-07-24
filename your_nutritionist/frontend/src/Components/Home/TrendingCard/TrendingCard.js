import React from "react";
import "./TrendingCard.scss";
import { Row, Col } from "react-bootstrap";

const TrendingCard = (props) => {
    console.log(props);
    return (
        <div className="trending-card-wrapper card">
            <div className="trending-card">
                <div className="trending-receipe">{props.recipe_name}</div>
                <div className="trending-username">
                    by <a href={"/user/" + props.creator_id}></a>
                    {props.creator_id} on {props.receipe_creation_date}
                </div>
                <div className="trending-stats">
                    <Row>
                        <Col>
                            <i className="material-icons">favorite</i>
                            {props.receipe_favorites}
                        </Col>
                        <Col>
                            <i className="material-icons">grade</i>
                            {props.receipe_ratings}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default TrendingCard;
