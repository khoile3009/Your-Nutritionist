import React from "react";
import "./NewFeedCard.scss";

const PostInteraction = (props) => {
	return (
		<div className="social-fn-wrapper">
			<div className="social-fn" onClick={props.toggleLike}>
				<div>
					{props.liked ? (
						<i className="material-icons social-upvotes">favorite</i>
					) : (
						<i className="material-icons social-upvotes">favorite_border</i>
					)}
				</div>
				&nbsp;
				{props.num_like}
			</div>
			<div className="social-fn" onClick={props.toggleCommentSection}>
				<i className="material-icons social-comments">comment</i>
				&nbsp;
				{props.num_comment}
			</div>
			<div className="social-fn">
				<i className="material-icons social-share-favorite">share</i>
			</div>
		</div>
	);
};

export default PostInteraction;
