import {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class SigninRequired extends (Component) {
    constructor(props){
        super(props)
    }

    componentWillUnmount(){
        this.props.hideModal()
    }

    render() {
        if (this.props.token === null && this.props.showModal === false) {
            this.props.showSigninRequiredModal()
        }
        return this.props.content
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        showModal: state.UI.showModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showSigninRequiredModal: () => dispatch(actions.showSigninRequiredModal()),
        hideModal : () => dispatch(actions.hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps,)(SigninRequired)