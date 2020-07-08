import React from 'react';
import "./TrendingCard.css"


const TrendingCard = (props) => {
    return <>
        <div className="trending-card card clickable"
        style={{backgroundImage:"url('" + props.url + "')"}}
        onClick={props.goToRoute}>
            <p>{props.text}</p>
        </div>
    </>
}

export default TrendingCard;