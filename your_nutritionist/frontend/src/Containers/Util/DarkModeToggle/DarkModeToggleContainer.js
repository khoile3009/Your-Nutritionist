import React, { Component } from "react";
import DarkModeToggle from "../../../Components/Util/DarkModeToggle/DarkModeToggle";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
class DarkModeToggleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			darkmode: false,
		};
		this.modeChangeHandler = this.modeChangeHandler.bind(this);
	}

	// componentDidMount(){
	// 	let darkmode = localStorage.getItem('DARKMODE')
	// 	if(darkmode != null){
	// 		this.setState({darkmode: darkmode})
	// 	}
	// }

	modeChangeHandler = () => {
		this.setState(
			{
				// ...this.state,
				darkmode: !this.state.darkmode,
			},
			() => {
				localStorage.setItem('DARKMODE', this.state.darkmode)
				document.documentElement.setAttribute(
					"data-theme",
					this.state.darkmode === false ? "light" : "dark"
				);
			}
		);
	};

	render() {
		console.log(this.props.toggleDarkMode)
		return (
			<DarkModeToggle
				modeChangeHandler={this.props.toggleDarkMode}
				darkmode={this.props.darkmode}
			></DarkModeToggle>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		darkmode: state.darkmode,
// 	};
// };
const mapStateToProps = (state) => {
    return {
        darkmode: state.UI.darkmode,
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDarkMode: () => {dispatch(actions.toggleDarkMode())}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DarkModeToggleContainer);
