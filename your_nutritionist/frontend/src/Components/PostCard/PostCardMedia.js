import React from "react";
import "./PostCard.scss";
import PostCard from "./PostCard";

const PostCardMedia = (props) => {
    return (
        <div
            className={props.classes}
            style={{
                backgroundImage: "url('" + props.url + "')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        ></div>
    );
};

export default PostCardMedia;
