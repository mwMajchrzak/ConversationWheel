import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import CategoriesReducers from './CategoriesReducers';

export default combineReducers({
    auth: AuthReducers,
    cat: CategoriesReducers
})