import firebase from 'firebase';
import { CATEGORIES_FETCH_SUCCESS, CATEGORY_CREATED, SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from './types';
import ReduxThunk from 'redux-thunk';
 

export const fetchCustomCategories = () => {
    return {
        type: CUSTOM_CATEGORIES_FETCH_SUCCESS,
        playload: null
    };
};

export const categoryChanged = (text) => {
    return {
        type: CATEGORY_CHANGED,
        payload: text
    };
};
export const topicChanged = (text) => {
    return {
        type: TOPIC_CHANGED,
        payload: text
    };
};

export const saveTopic = (text) => {
    return {
        type: SAVE_TOPIC,
        payload: text
    };
};    

export const categoryCreate = ({ category, topics, uid }) => {
    const { currentUser } = firebase.auth();
        
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/categories`)
        .push({ category, topics })
        .then(() => {
            dispatch({ type: CATEGORY_CREATED });
        });    
    };
};

export const fetchCategories = () => {
    
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/categories`)
            .on('value', snapshot =>  {
                dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: Object.values(snapshot.val()) });

            });
    };
};
