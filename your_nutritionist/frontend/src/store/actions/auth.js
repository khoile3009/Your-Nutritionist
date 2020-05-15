import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';
import { hideModal } from './UI'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR,
    }
}

export const logout = () => {
    localStorage.removeItem('TOKEN');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const signin = (username, password, remember) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            username: username,
            password: password,
        };
        let url = 'api/auth/signin';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                if(remember === true) {
                    localStorage.setItem('TOKEN', response.data.token);
                }
                dispatch(authSuccess(response.data.token, response.data.user.id, response.data.user.username));
                dispatch(hideModal());
            })
            .catch(err => {
                dispatch(authFail("Invalid Credentials"));
            });
    };
};

export const register = (username, email, password, remember) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            username: username,
            email: email,
            password: password
        }
        let url = 'api/auth/register';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.user.id, response.data.user.username));
                dispatch(hideModal());
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const signout = (token) => {
    return dispatch => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }

        let url = 'api/auth/signout';
        axios.post(url, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch(logout())
            })
            .catch(err => {
                console.log(err)
                dispatch(logout())
            })
    }
}

export const retrieveUserFromToken = (token) => {
    return dispatch => {
        dispatch(authStart())
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }

        let url = 'api/auth/user';
        axios.get(url, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch(authSuccess(token, response.data.id, response.data.username));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(null))
            })
    }
}