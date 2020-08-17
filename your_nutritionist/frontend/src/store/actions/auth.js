import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';
import { hideModal, showInfoModal } from './UI'

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
        let url = 'api/user/auth/signin';
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

export const register = (username, email, password, first_name, last_name, remember) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            username: username,
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        }
        console.log(authData)
        let url = 'api/user/auth/register';
        
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                if(remember === true) {
                    localStorage.setItem('TOKEN', response.data.token);
                }
                dispatch(authSuccess(response.data.token, response.data.user.id, response.data.user.username));
                dispatch(showInfoModal());
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}


export const submitHeadline= (headline, user_id, token) => {
    return dispatch => {
        const data = {
            headline : headline,
        }
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
        let url = 'api/user/headline';
        axios.post(url, data, {headers: headers})
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const submitIntroduction= (introduction, user_id, token) => {
    return dispatch => {
        const data = {
            introduction: introduction,
        }
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
        let url = 'api/user/introduction';
        axios.post(url, data, {headers: headers})
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export const signout = (token) => {
    return dispatch => {
        console.log('Token ' + token)
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
        let data = null
        console.log(headers)
        let url = 'api/user/auth/signout';
        axios.post(url, data, { headers: headers })
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
        console.log('Token ' + token)
        dispatch(authStart())
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }

        let url = 'api/user/auth/user';
        axios.get(url, { headers: headers })
            .then(response => {
                console.log(response);
                dispatch(authSuccess(token, response.data.id, response.data.username));
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('TOKEN')
                dispatch(authFail(null))
            })
    }
}