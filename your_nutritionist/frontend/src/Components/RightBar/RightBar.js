import React from "react";
import "./RightBar.scss";
import DarkModeToggleContainer from "../../Containers/Util/DarkModeToggle/DarkModeToggleContainer";

const RightBar = (props) => {
	return (
		<div className="right-bar-wrapper">
			<DarkModeToggleContainer></DarkModeToggleContainer>
			{document.documentElement.setAttribute(
				"data-theme",
				props.darkmode === false ? "light" : "dark"
			)}
			<div className="adverts-wrapper card clickable">
				<h1>Ask for ads and you shall receive.</h1>
			</div>
			<div className="site-info-wrapper">FaceCookery &copy; 2020.</div>
		</div>
	);
};

export default RightBar;
