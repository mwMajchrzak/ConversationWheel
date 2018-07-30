
import firebase from 'firebase';
import { EMAIL_CHANGED, LOGOUT_USER_SUCCESS, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from './types';
import ReduxThunk from 'redux-thunk';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};



export const loginUser = ({ email, password }) => {
    return (dispatch) => {
    dispatch({ type: LOGIN_USER });  

    firebase.auth().signInWithEmailAndPassword(email, password) 
        .then(console.log('firebase tried sign in'))
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(console.log('firebase tried sign up'))
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch));
                
                

        })
    };
};
export const logoutUser = () => {
    return (dispatch) => {
    firebase.auth().signOut()
    .then( user => logoutUserSuccess(dispatch, user))
    .catch(console.log( 'sign out failed'));
    };
};


const logoutUserSuccess = (dispatch) => {
    dispatch({ type: LOGOUT_USER_SUCCESS })
}

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
}
const loginUserSuccess = (dispatch, user) => {
   dispatch({ type: LOGIN_USER_SUCCESS,  payload: user })
};

