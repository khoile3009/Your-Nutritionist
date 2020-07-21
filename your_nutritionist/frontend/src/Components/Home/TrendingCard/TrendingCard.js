import React from 'react';
import "./TrendingCard.css"


const TrendingCard = (props) => {
    return <>
        <div className="trending-card card clickable"
        style={{backgroundImage:"url('" + props.url + "')"}}
        onClick={props.goToRoute}>
            <div className="trending-txt">&#9656;{props.text}</div>
        </div>
    </>
}

export default TrendingCard;