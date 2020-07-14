import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    showModal : false,
    modalType : 1,
}

const showSigninModal = (state, action) => {
    return updateObject( state, {showModal: true, modalType: 1})
}

const showRegisterModal = (state, action) => {
    return updateObject( state, {showModal: true, modalType: 2})
}

const showForgetPasswordModal = (state, action) => {
    return updateObject( state, {showModal: true, modalType: 3})
}

const showSigninRequiredModal = (state, action) => {
    return updateObject( state, {showModal: true, modalType: 4})
}

const showInfoModal = (state, action) => {
    return updateObject( state, {showModal: true, modalType: 5})
}


const hideModal = (state, action) => {
    return updateObject( state, {showModal: false})
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SIGNIN_MODAL: return showSigninModal(state, action)
        case actionTypes.SHOW_REGISTER_MODAL: return showRegisterModal(state, action)
        case actionTypes.SHOW_FORGET_PASSWORD_MODAL: return showForgetPasswordModal(state, action)
        case actionTypes.HIDE_MODAL: return hideModal(state, action)
        case actionTypes.SHOW_SIGNIN_REQUIRED_MODAL: return showSigninRequiredModal(state, action)
        case actionTypes.SHOW_INFO_MODAL: return showInfoModal(state, action)
        default: 
            return state;
    }
}

export default reducer;