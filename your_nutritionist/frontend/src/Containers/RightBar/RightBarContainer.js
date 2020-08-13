import React, { Component } from "react";
import RightBar from "../../Components/RightBar/RightBar";
import DarkModeToggleContainer from "../../Containers/Util/DarkModeToggle/DarkModeToggleContainer";

class RightBarContainer extends Component {
	render() {
		{
			console.log(this.props);
		}
		return (
			<>
				<RightBar></RightBar>
			</>
		);
	}
}

export default RightBarContainer;
