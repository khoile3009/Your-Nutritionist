import React from 'react';
import './NewFeedCard.scss';

const PostInteraction = (props) => {
    return <div className="social-fn-wrapper">
				<div className="social-fn" onClick={props.toggleLike}>
					<div >
						{props.liked 
						? <i className="material-icons" style={{ color: '#E97272' }}>favorite</i>
						:<i class="material-icons"  style={{ color: '#E97272' }}>favorite_border</i>
						}
					
					</div>
					
					
					&nbsp;
					{props.num_like}
				</div>
				<div className="social-fn" onClick={props.toggleCommentSection}>
					<i className="material-icons" style={{ color: '#4BC8AE' }}>
						comment
					</i>
					&nbsp;
					{props.num_comment}
				</div>
				<div className="social-fn" >
					<i className="material-icons" style={{ color: 'rgb(255, 174, 0)' }}>
						share
					</i>
				</div>
			</div>

};

export default PostInteraction;
