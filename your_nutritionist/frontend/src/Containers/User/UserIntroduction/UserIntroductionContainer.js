import React, { Component } from 'react';
import UserIntroduction from '../../../Components/User/UserIntroduction/UserIntroduction';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class UserIntroductionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			introduction: '',
			introductionEdit: { editing: false, introduction: '' }
		};
		this.editIntroductionChangeHandler = this.editIntroductionChangeHandler.bind(this);
		this.startIntroductionEdit = this.startIntroductionEdit.bind(this);
		this.stopIntroductionEdit = this.stopIntroductionEdit.bind(this);
		this.submitIntroduction = this.submitIntroduction.bind(this);
	}

	componentDidMount() {
		axios.get('api/user/' + this.props.userId + '/introduction').then((response) => {
			this.setState({ introduction: response.data.introduction });
		});
	}

	editIntroductionChangeHandler = (event) => {
		this.setState({ introductionEdit: { ...this.state.introductionEdit, introduction: event.target.value } });
	};

	startIntroductionEdit = () => {
		console.log('start');
		this.setState({ introductionEdit: { editing: true, introduction: this.state.introduction } });
	};

	stopIntroductionEdit = () => {
		this.setState({ introductionEdit: { ...this.state.introductionEdit, editing: false } });
	};

	submitIntroduction = (event) => {
		event.preventDefault();
		let headers = {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + this.props.token
		};
		axios
			.put(
				'api/user/introduction',
				{ introduction: this.state.introductionEdit.introduction },
				{
					headers: headers
				}
			)
			.then((response) => {
				this.setState({ introduction: response.data.introduction });
				this.stopIntroductionEdit();
			});
	};

	render() {
		return (
			<UserIntroduction
				introduction={this.state.introduction}
				isSelf={this.props.id === this.props.userId}
				logged_in={this.props.id}
				introductionEdit={this.state.introductionEdit}
				editIntroductionChangeHandler={this.editIntroductionChangeHandler}
				startIntroductionEdit={this.startIntroductionEdit}
				stopIntroductionEdit={this.stopIntroductionEdit}
				submitIntroduction={this.submitIntroduction}
			/>
		);
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
