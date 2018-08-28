import {  CATEGORIES_FETCH, CATEGORIES_FETCH_SUCCESS, CATEGORY_CREATED, SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from '../actions/types'; 
import data from '../CustomCategories.json';

const INITIAL_STATE = { customCategories:'', userCategories: '', category:'', topic:'', topics:'', loading: false };



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

        case CATEGORY_CREATED:
            return { ...state, category:'', topic:'', topics:''}
    
        // case CATEGORIES_FETCH_SUCCESS:
        //     return { ...state, userCategories: action.payload  }

        case CATEGORIES_FETCH:
            return { ...state, loading: true }

        case CATEGORIES_FETCH_SUCCESS:
             return { ...state, loading: false, userCategories: action.payload }



        //     case LOGIN_USER: 
        //     return { ...state, loading: true, error: ''};

        // case LOGIN_USER_SUCCESS:
         
        //     return { ...state, ...INITIAL_STATE, user: action.payload };
        default:
            return state;
    }
};