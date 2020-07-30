import React from 'react';
import './NewFeedCard.scss';

const PostProfilePic = (props) => {
    return <div
        className="profilepic-newfeed clickable"
        onClick={props.toCreator}
        style={{
            backgroundColor: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")",
            backgroundImage: "url('" + props.profilepic + "')"
        }}
    />
}

export default PostProfilePic;