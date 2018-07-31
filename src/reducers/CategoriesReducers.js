import {  SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from '../actions/types'; 
import data from '../CustomCategories.json';

const INITIAL_STATE = { customCategories:'', userCategories: '', category:'', topic:'', topics:'' };



export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case CUSTOM_CATEGORIES_FETCH_SUCCESS: 
            return { ...state, ...INITIAL_STATE, customCategories: data };  

        case CATEGORY_CHANGED: 
            return { ...state, category: action.payload };

        case TOPIC_CHANGED:
            return { ...state, topic: action.payload }; 

        case SAVE_TOPIC:
            return { ...state, topics: [...state.topics, action.payload], topic:''}; 
    

        default:
            return state;
    }
};