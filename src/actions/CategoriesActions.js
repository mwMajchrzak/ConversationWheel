import firebase from 'firebase';
import { SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from './types';
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