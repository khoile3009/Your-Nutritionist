import React from "react";
import "./NewFeedCard.scss";

const PostUsername = (props) => {
	return (
		<div className="username-newfeed">
			<a href="#" onClick={props.toCreator}>
				{props.username}
				{console.log(props)}
			</a>
		</div>
	);
};

export default PostUsername;
