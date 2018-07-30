import {  CUSTOM_CATEGORIES_FETCH_SUCCESS } from '../actions/types'; 
import data from '../CustomCategories.json';

const INITIAL_STATE = { customCategories:'', userCategories: '' };


export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case CUSTOM_CATEGORIES_FETCH_SUCCESS: 
              return { ...state, ...INITIAL_STATE, customCategories: data };  
        default:
            return state;
    }
};