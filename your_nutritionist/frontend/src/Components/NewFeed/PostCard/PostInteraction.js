import React from 'react';
import './NewFeedCard.scss';

const PostInteraction = (props) => {
    return <div className="social-fn-wrapper">
				<div className="social-fn">
					<i className="material-icons" style={{ color: '#E97272' }}>
						like
					</i>
					&nbsp;
					{props.num_like}
				</div>
				<div className="social-fn">
					<i className="material-icons" style={{ color: '#4BC8AE' }}>
						comment
					</i>
					&nbsp;
					{props.num_comment}
				</div>
				<div className="social-fn">
					<i className="material-icons" style={{ color: 'rgb(255, 174, 0)' }}>
						share
					</i>
				</div>
			</div>
}

export default PostInteraction;