import firebase from 'firebase';
import { CUSTOM_CATEGORIES_FETCH_SUCCESS } from './types';
import ReduxThunk from 'redux-thunk';
 

export const fetchCustomCategories = () => {
    return {
        type: CUSTOM_CATEGORIES_FETCH_SUCCESS,
        playload: null
    };
};