import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { LoginForm, RegisterForm, ForgotPasswordForm, SigninRequiredForm, InfoForm } from '../../../Components/Util/Authentication/ModalContent';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: {
                username: '',
                email: '',
                password: '',
                repassword: '',
                first_name: '',
                last_name: '',
                remember: false,
            },
            user_info:{
                headline: '',
                introduction: '',
            },
            ok: {
                okEmail: null,
                okUsername: null,
                okPassword: null,
                okRePassword: null,
                okName: null,
            }
        }
        this.hideModal = this.hideModal.bind(this)

        this.signinHandler = this.signinHandler.bind(this)
        this.registerHandler = this.registerHandler.bind(this)

        this.isEmailValidate = this.isEmailValidate.bind(this)
        this.emailFormatValidate = this.emailFormatValidate.bind(this)
        this.emailNotBlankValidate = this.emailNotBlankValidate.bind(this)
        this.passwordLongEnoughValidate = this.passwordLongEnoughValidate.bind(this)
        this.passwordMatchValidate = this.passwordMatchValidate.bind(this)
        this.usernameLongEnoughValidate = this.usernameLongEnoughValidate.bind(this)
        this.nameNotBlankValidate = this.nameNotBlankValidate.bind(this)

        this.resetPasswords = this.resetPasswords.bind(this)
        this.resetState = this.resetState.bind(this)

        this.emailChangeHandler = this.emailChangeHandler.bind(this)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.repasswordChangeHandler = this.repasswordChangeHandler.bind(this)
        this.first_nameChangeHandler = this.first_nameChangeHandler.bind(this)
        this.last_nameChangeHandler = this.last_nameChangeHandler.bind(this)
        this.rememberUserHandler = this.rememberUserHandler.bind(this)
        this.headlineChangeHandler = this.headlineChangeHandler.bind(this)
        this.introductionChangeHandler = this.introductionChangeHandler.bind(this)

        this.updateErrorStateWithCallback = this.updateErrorStateWithCallback.bind(this)
        this.isErrorFree = this.isErrorFree.bind(this)
        this.registerIfNoError = this.registerIfNoError.bind(this)
        this.submitInfoHandler = this.submitInfoHandler.bind(this)

        this.showSigninModal = this.showSigninModal.bind(this)
        this.showRegisterModal = this.showRegisterModal.bind(this)
    }

    CodeToModal = (modalCode) => {
        switch (this.props.modalType) {
            case 1:
                return <LoginForm
                    hideModal={this.hideModal}
                    showRegisterModal={this.showRegisterModal}
                    showForgetPasswordModal={this.showForgetPasswordModal}
                    signinHandler={this.signinHandler}
                    auth={this.state.auth}
                    usernameChangeHandler={this.usernameChangeHandler}
                    passwordChangeHandler={this.passwordChangeHandler}
                    rememberUserHandler={this.rememberUserHandler}
                    error={this.props.error}
                ></LoginForm>
            case 2:
                return <RegisterForm
                    hideModal={this.hideModal}
                    showSigninModal={this.showSigninModal}
                    showForgetPasswordModal={this.props.showForgetPasswordModal}
                    auth={this.state.auth}
                    usernameChangeHandler={this.usernameChangeHandler}
                    passwordChangeHandler={this.passwordChangeHandler}
                    repasswordChangeHandler={this.repasswordChangeHandler}
                    emailChangeHandler={this.emailChangeHandler}
                    first_nameChangeHandler={this.first_nameChangeHandler}
                    last_nameChangeHandler={this.last_nameChangeHandler}
                    error={this.props.error}
                    ok={this.state.ok}

                    registerHandler={this.registerHandler}
                ></RegisterForm>
            case 3:
                return <ForgotPasswordForm
                    hideModal={this.props.hideModal}
                ></ForgotPasswordForm>
            case 4:
                return <SigninRequiredForm
                showSigninModal={this.showSigninModal}
                showRegisterModal={this.showRegisterModal}
                ></SigninRequiredForm>
            case 5:
                return <InfoForm
                    user_info = {this.state.user_info}
                    introductionChangeHandler= {this.introductionChangeHandler}
                    headlineChangeHandler={this.headlineChangeHandler}
                    hideModal={this.hideModal}
                    submitInfoHandler={this.submitInfoHandler}
                ></InfoForm>
            default: 
                return <LoginForm
                hideModal={this.hideModal}
                showRegisterModal={this.showRegisterModal}
                showForgetPasswordModal={this.showForgetPasswordModal}
                signinHandler={this.signinHandler}
                auth={this.state.auth}
                usernameChangeHandler={this.usernameChangeHandler}
                passwordChangeHandler={this.passwordChangeHandler}
                rememberUserHandler={this.rememberUserHandler}
                error={this.props.error}
            ></LoginForm>
        }
    }

    hideModal = () => {
        this.resetState()
        this.props.hideModal()
    }

    emailFormatValidate = () => {
        const mailformat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
 
        return mailformat.test(this.state.auth.email)
    }

    emailNotBlankValidate = () => {
        return (this.state.auth.email !== '')
    }

    isEmailValidate = () => {
        return (this.emailFormatValidate() && this.emailNotBlankValidate()) 
    }

    passwordMatchValidate = () => {
        return (this.state.auth.password === this.state.auth.repassword) 
    }

    usernameLongEnoughValidate = () => {
        return (this.state.auth.username.length >= 6) 
    }

    passwordLongEnoughValidate = () => {
        return (this.state.auth.password.length >= 8) 
  
    }

    nameNotBlankValidate = () => {
        return (this.state.auth.first_name.length !== 0 || this.state.auth.last_name.length !== 0)
    }

    resetPasswords = () => {
        this.setState({
            auth: {
                ...this.state.auth,
                password: '',
                repassword: ''
            }
        })
    }

    resetState = () => {
        this.setState({
            auth:
            {
                username: '',
                email: '',
                password: '',
                repassword: '',
                remember: false,
            },
            ok: {
                okEmail: null,
                okUsername: null,
                okPassword: null,
                okRePassword: null,
            }
        })
    }

    passwordChangeHandler = (event) => {
        this.setState({
            auth: { ...this.state.auth, password: event.target.value },
            ok: { ...this.state.ok, okPassword: null }
        })

    }

    repasswordChangeHandler = (event) => {
        this.setState({
            auth: { ...this.state.auth, repassword: event.target.value },
            ok: { ...this.state.ok, okRePassword: null }
        })
    }

    usernameChangeHandler = (event) => {
        this.setState({
            auth: { ...this.state.auth, username: event.target.value },
            ok: { ...this.state.ok, okUsername: null }
        })
    }

    emailChangeHandler = (event) => {
        this.setState({
            auth: { ...this.state.auth, email: event.target.value },
            ok: { ...this.state.ok, okEmail: null }
        })
    }

    first_nameChangeHandler = (event) => {
        this.setState({
            auth: { ...this.state.auth, first_name: event.target.value}
        })
    }

    last_nameChangeHandler = (event) => {
        this.setState({
            auth: { ...this.state.auth, last_name: event.target.value}
        })
    }

    headlineChangeHandler = (event) => {
        this.setState({
            user_info: {... this.state.user_info, headline: event.target.value}
        })
    }

    introductionChangeHandler = (event) => {
        this.setState({
            user_info: {... this.state.user_info, introduction: event.target.value}
        })
    }

    rememberUserHandler = (event) => {
        this.setState({
            auth: {
                ...this.state.auth,
                remember: !this.state.auth.remember
            }
        })
    }

    updateErrorStateWithCallback = (callback) => {
        this.setState(
            {
                ok: {
                    okUsername: this.usernameLongEnoughValidate(),
                    okEmail: this.isEmailValidate(),
                    okPassword: this.passwordLongEnoughValidate(),
                    okRePassword: this.passwordMatchValidate(),
                    okName: this.nameNotBlankValidate(),
                }
            }
            , callback
        )
    }
 
    isErrorFree = () => {
        return (
            this.state.ok.okEmail &&
            this.state.ok.okPassword &&
            this.state.ok.okRePassword &&
            this.state.ok.okUsername &&
            this.state.ok.okName
        )
    }

    registerIfNoError = () => {
        if (this.isErrorFree()) {
            this.props.register(this.state.auth.username, this.state.auth.email, this.state.auth.password, this.state.auth.first_name, this.state.auth.last_name, this.state.auth.remember)
            this.resetPasswords()
        }
    }
    
    registerHandler = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.updateErrorStateWithCallback(this.registerIfNoError);
    }


    signinHandler = (event) => {
        event.preventDefault();
        this.props.signin(this.state.auth.username, this.state.auth.password, this.state.auth.remember)
        this.resetPasswords();
    }

    submitInfoHandler = (event) => {
        event.preventDefault();
        this.props.submitHeadline(this.state.user_info.headline, this.props.userId, this.props.token)
        this.props.submitIntroduction(this.state.user_info.introduction, this.props.userId, this.props.token)
        this.props.hideModal()
    }

    

    showRegisterModal = (event) => {
        event.preventDefault();
        this.resetState();
        this.props.showRegisterModal(event)
    }

    showSigninModal = (event) => {
        this.resetState();
        this.props.showSigninModal(event)
    }

    showInfoModal = (event) => {
        this.resetState();
        this.props.showInfoModal(event)
    }

    render() {
        return <Modal
            show={this.props.showModal}
            onHide={this.hideModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {this.CodeToModal(this.props.modalType)}
        </Modal>
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        showModal: state.UI.showModal,
        modalType: state.UI.modalType,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signin: (username, password, remember) => dispatch(actions.signin(username, password, remember)),
        register: (username, email, password, first_name, last_name, remember) => dispatch(actions.register(username, email, password, first_name, last_name,remember)),
        showRegisterModal: (event) => dispatch(actions.showRegisterModal(event)),
        showSigninModal: (event) => dispatch(actions.showSigninModal(event)),
        showForgetPasswordModal: (event) => dispatch(actions.showForgetPasswordModal(event)),
        showInfoModal: (event) => dispatch(actions.showInfoModal()),
        hideModal: () => dispatch(actions.hideModal()),
        submitHeadline: (headline,user_id,token) => dispatch(actions.submitHeadline(headline, user_id, token)),
        submitIntroduction: (introduction,user_id,token) => dispatch(actions.submitIntroduction(introduction, user_id, token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);