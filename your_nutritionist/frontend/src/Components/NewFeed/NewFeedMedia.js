import React from 'react';
import './NewFeedCard.scss';

const NewCardMedia = (props) => {
	return (
		<div
			className={props.classes}
			style={{
				backgroundImage: "url('" + props.url + "')",
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat'
			}}
		/>
	);
};

export default NewCardMedia;
