import React from 'react';
import './NewFeedCard.scss';

const PostContent = (props) => {
    return <div className="content-newfeed-wrapper">
        <div className="text-content-newfeed">{props.content}</div>
    </div>
}

export default PostContent;