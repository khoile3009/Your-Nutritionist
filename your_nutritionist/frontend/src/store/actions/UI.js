import * as actionTypes from './actionTypes';
import { clearError } from './auth'

export const showSigninModal = () => {
    return {
        type: actionTypes.SHOW_SIGNIN_MODAL
    }
}

export const showRegisterModal = () => {
    return {
        type: actionTypes.SHOW_REGISTER_MODAL
    }
}

export const showForgetPasswordModal = () => {
    return {
        type: actionTypes.SHOW_FORGET_PASSWORD_MODAL
    }
}

export const showSigninRequiredModal = () => {
    return {
        type: actionTypes.SHOW_SIGNIN_REQUIRED_MODAL
    }
}

export const showInfoModal = () => {
    return {
        type: actionTypes.SHOW_INFO_MODAL
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