import React from 'react';
import './SideBar.scss';

const SideBar = (props) => {
	console.log(props);
	return (
		<div className="side-bar-wrapper">
			<div className="side-bar-create">
				<h3>What are you up to?</h3>
				<div className="create-recipe-btn">Create a recipe</div>
			</div>
		</div>
	);
};

export default SideBar;
