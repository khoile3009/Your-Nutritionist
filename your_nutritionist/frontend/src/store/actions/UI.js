import * as actionTypes from './actionTypes';
import { clearError } from './auth'

export const showSigninModal = (event) => {
    event.preventDefault()
    return {
        type: actionTypes.SHOW_SIGNIN_MODAL
    }
}

export const showRegisterModal = (event) => {
    event.preventDefault()
    return {
        type: actionTypes.SHOW_REGISTER_MODAL
    }
}

export const showForgetPasswordModal = (event) => {
    event.preventDefault()
    return {
        type: actionTypes.SHOW_FORGET_PASSWORD_MODAL
    }
}

export const hideModal = () => {
    return dispatch => {
        dispatch(clearError())
        dispatch(function(){
            return {
                type: actionTypes.HIDE_MODAL
            }
        }())
    }
}