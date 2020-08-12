import React, { Component } from "react";
import DarkModeToggle from "../../../Components/Util/DarkModeToggle/DarkModeToggle";
import { connect } from "react-redux";

class DarkModeToggleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			darkmode: false,
		};
		this.modeChangeHandler = this.modeChangeHandler.bind(this);
	}

	modeChangeHandler = () => {
		this.setState({
			// ...this.state,
			darkmode: !this.state.darkmode,
		});
		{
			document.documentElement.setAttribute(
				"data-theme",
				this.state.darkmode === false ? "light" : "dark"
			);
		}
	};

	render() {
		console.log(this.state.darkmode);
		return (
			<DarkModeToggle
				modeChangeHandler={this.modeChangeHandler}
				darkmode={this.state.darkmode}
			></DarkModeToggle>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		darkmode: state.darkmode,
// 	};
// };

export default DarkModeToggleContainer;
