import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { LoginForm, RegisterForm, ForgotPasswordForm } from '../../Components/Authentication/ModalContent';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class ModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: {
                username: '',
                email: '',
                password: '',
                repassword: '',
                remember: false,
            },
            ok: {
                okEmail: true,
                okUsername: true,
                okPassword: null,
                okRePassword: null,
            }
        }
        this.hideModal = this.hideModal.bind(this)

        this.signinHandler = this.signinHandler.bind(this)
        this.registerHandler = this.registerHandler.bind(this)

        this.isEmailValidate = this.isEmailValidate.bind(this)
        this.emailFormatValidate = this.emailFormatValidate.bind(this)
        this.emailNotBlannkValidate = this.emailNotBlannkValidate.bind(this)
        this.passwordLongEnoughValidate = this.passwordLongEnoughValidate.bind(this)
        this.passwordMatchValidate = this.passwordMatchValidate.bind(this)
        this.usernameLongEnoughValidate = this.usernameLongEnoughValidate.bind(this)

        this.resetPasswords = this.resetPasswords.bind(this)
        this.resetState = this.resetState.bind(this)

        this.emailChangeHandler = this.emailChangeHandler.bind(this)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.repasswordChangeHandler = this.repasswordChangeHandler.bind(this)
        this.rememberUserHandler = this.rememberUserHandler.bind(this)

        this.updateErrorStateWithCallback = this.updateErrorStateWithCallback.bind(this)
        this.isErrorFree = this.isErrorFree.bind(this)
        this.registerIfNoError = this.registerIfNoError.bind(this)

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
                break
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
                    error={this.props.error}
                    ok={this.state.ok}

                    registerHandler={this.registerHandler}
                ></RegisterForm>
                break
            case 3:
                return <ForgotPasswordForm
                    hideModal={this.props.hideModal}
                ></ForgotPasswordForm>
                break

        }
    }

    hideModal = () => {
        this.resetState()
        this.props.hideModal()
    }

    emailFormatValidate = () => {
        const mailformat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        console.log(mailformat.test(this.state.auth.email))
        return mailformat.test(this.state.auth.email)
    }

    emailNotBlannkValidate = () => {
        return (this.state.auth.email !== '')
    }

    isEmailValidate = () => {
        return (this.emailFormatValidate() && this.emailNotBlannkValidate()) 
    }

    passwordMatchValidate = () => {
        return (this.state.auth.password === this.state.auth.repassword) 
    }

    usernameLongEnoughValidate = () => {
        return (this.state.auth.username.length >= 8) 
    }

    passwordLongEnoughValidate = () => {
        return (this.state.auth.password.length >= 8) 
  
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
                    okRePassword: this.passwordMatchValidate()
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
            this.state.ok.okUsername
        )
    }

    registerIfNoError = () => {
        if (this.isErrorFree()) {
            this.props.register(this.state.auth.username, this.state.auth.email, this.state.auth.password, this.state.auth.remember)
            this.resetPasswords()
        }
    }
    
    registerHandler = (event) => {
        event.preventDefault();
        this.updateErrorStateWithCallback(this.registerIfNoError);
        console.log(this.state.ok)
    }


    signinHandler = (event) => {
        event.preventDefault();
        console.log(this.state.auth.remember)
        this.props.signin(this.state.auth.username, this.state.auth.password, this.state.auth.remember)
        this.resetPasswords();
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
        modalType: state.UI.modalType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signin: (username, password, remember) => dispatch(actions.signin(username, password, remember)),
        register: (username, email, password, remember) => dispatch(actions.register(username, email, password, remember)),

        showRegisterModal: (event) => dispatch(actions.showRegisterModal(event)),
        showSigninModal: (event) => dispatch(actions.showSigninModal(event)),
        showForgetPasswordModal: (event) => dispatch(actions.showForgetPasswordModal(event)),
        hideModal: () => dispatch(actions.hideModal())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);