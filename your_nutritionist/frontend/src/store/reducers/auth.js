import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: localStorage.getItem('TOKEN'),
    userId: null,
    username: null,
    fullname: null,
    error: null,
    loading: false
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        username: action.username,
        fullname: action.fullname,
        error: null,
        loading: false
     } );
};

const clearError = (state, action) => {
    return updateObject( state, {
        error: null,
    })
}

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, username: null });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.CLEAR_ERROR: return clearError(state, action);
        default:
            return state;
    }
};



export default reducer;