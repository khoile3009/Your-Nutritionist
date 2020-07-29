import React from 'react';
import './NewFeedCard.scss';

const PostProfilePic = (props) => {
    return <div
        className="profilepic-newfeed clickable"
        onClick={props.toCreator}
        style={{
            backgroundImage: "url('" + props.profilepic + "')"
        }}
    />
}

export default PostProfilePic;