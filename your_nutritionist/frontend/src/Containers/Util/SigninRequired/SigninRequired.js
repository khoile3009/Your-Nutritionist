import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import SigninRequiredForm from '../../../Components/Util/SigninRequiredForm/SigninRequiredForm'
class SigninRequired extends (Component) {
    constructor(props){
        super(props)
    }


    render() {
        return this.props.token === null
        ?<SigninRequiredForm
            showSigninModal={this.props.showSigninModal}
            showRegisterModal={this.props.showRegisterModal}
        
        ></SigninRequiredForm>
        : this.props.content
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
        showSigninModal: () => dispatch(actions.showSigninModal()),
        showRegisterModal: () => dispatch(actions.showRegisterModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps,)(SigninRequired)