import React, { Component } from 'react';
import UserIntroduction from '../../Components/UserIntroduction/UserIntroduction';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class UserIntroductionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			introduction: ''
		};
	}

	componentDidMount() {
		axios.get('api/user/' + this.props.userId + '/introduction').then((response) => {
			this.setState({ introduction: response.data.introduction });
		});
	}

	render() {
		return <UserIntroduction introduction={this.state.introduction} isSelf={this.props.id === this.props.userId} />;
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		id: state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showSigninRequiredModal: () => dispatch(actions.showSigninRequiredModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIntroductionContainer);
// Create these shit plz
