import firebase, { key } from 'firebase';
import { DELETEMODE_OFF, DELETEMODE_ON, FILL_INPUTS, CLICKEDCATEGORY_CHANGED, CATEGORIES_FETCH, CATEGORIES_FETCH_SUCCESS, CATEGORY_CREATED, SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from './types';

export const fetchCustomCategories = () => {
    return {
        type: CUSTOM_CATEGORIES_FETCH_SUCCESS,
        playload: null
    };
};
export const turnOnDeleteMode = () => {
    return {
        type: DELETEMODE_ON,
        playload: null
    };
};
export const turnOffDeleteMode = () => {
    return {
        type: DELETEMODE_OFF,
        playload: null
    };
};

export const categoryChanged = (text) => {

    return {
        type: CATEGORY_CHANGED,
        payload: text
    };
};

export const saveTopic = (text) => {
    return {
        type: SAVE_TOPIC,
        payload: text
    };
};

export const topicChanged = (text) => {
    return {
        type: TOPIC_CHANGED,
        payload: text
    };
};
export const fillInputs = (category, topics) => {
    return {
        type: FILL_INPUTS,
        payload: [topics, category]
    };
};

export const clickedCategoryChanged = (text) => {
    return {
        type: CLICKEDCATEGORY_CHANGED,
        payload: text
    };
};

export const categorySave = ({ category, topics, key }) => {

    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/categories/${key}`)
            .set({ category, topics, key })
            .then(() => {
                dispatch({ type: CATEGORY_CREATED });
                //Actions.pop();
            });
    };
};

export const categoryCreate = ({ category, topics }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {

        const myRef = firebase.database().ref(`/users/${currentUser.uid}/categories/`).push();
        const myKey = myRef.key

        myRef
            .set({ category, topics, key: myKey, })
            .then(() => {
                dispatch({ type: CATEGORY_CREATED });
            });
    };
};

export const fetchCategories = () => {

    const { currentUser } = firebase.auth();

    return (dispatch) => {

        dispatch({ type: CATEGORIES_FETCH });

        firebase.database().ref(`/users/${currentUser.uid}/categories/`)
            .on('value', snapshot => {

                if (snapshot.val() !== null) {
                    const data = Object.values(snapshot.val())
                    return dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: data });
                }
                else {
                    return dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: '' });
                }
            });
    };
};

export const categoryDelete = ({ uid, clickedCategory }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/categories/${clickedCategory}`)
            .remove()
    };
};