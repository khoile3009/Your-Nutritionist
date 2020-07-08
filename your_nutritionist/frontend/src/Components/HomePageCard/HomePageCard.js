import React from 'react';


const HomePageCard = (props) => {
    return <>
        <div 
        style={{backgroundImage:"url('" + props.url + "')"}}
        onClick={props.goToRoute}>
            <p>{props.text}</p>
        </div>
    </>
}

export default HomePageCard;