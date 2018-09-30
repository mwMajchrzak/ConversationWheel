import {  DELETEMODE_OFF, DELETEMODE_ON, FILL_INPUTS, CLICKEDCATEGORY_CHANGED, CATEGORIES_FETCH, CATEGORIES_FETCH_SUCCESS, CATEGORY_CREATED, SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from '../actions/types'; 
import data from '../CustomCategories.json';

const INITIAL_STATE = { deleteMode: false, clickedCategory:'', customCategories:'', userCategories: '', category:'', topic:'', topics:'', loading: false };



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

        
        case FILL_INPUTS:
            return { ...state, topics: action.payload[0], category: action.payload[1], topic:''};     

        case CATEGORY_CREATED:
            return { ...state, category:'', topic:'', topics:''}

        case CATEGORIES_FETCH:
            return { ...state, loading: true }

        case CATEGORIES_FETCH_SUCCESS:
            return { ...state, loading: false, userCategories: action.payload }

        case CLICKEDCATEGORY_CHANGED: 
            return { ...state, clickedCategory: action.payload };
        
        case DELETEMODE_ON: 
            return { ...state, deleteMode: true };

        case DELETEMODE_OFF: 
            return { ...state, deleteMode: false };
         
        default:
            return state;
    }
};