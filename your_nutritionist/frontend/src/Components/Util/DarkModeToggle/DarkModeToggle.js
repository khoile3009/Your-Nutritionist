import React from "react";
import Switch from "@material-ui/core/Switch";
import "./DarkModeToggle.scss";

const DarkModeToggle = (props) => {
	return (
		<>
			<div className="dark-mode-toggler">
				Dark mode
				<Switch
					checked={props.darkmode}
					onChange={props.modeChangeHandler}
					name="dark-mode-switch"
					inputProps={{ "aria-label": "dark mode switch" }}
				/>
			</div>
		</>
	);
};

export default DarkModeToggle;
