import { combineReducers } from 'redux';
//import AuthReducer from './AuthReducer';
import AuthReducers from './AuthReducers';

export default combineReducers({
    auth: AuthReducers
})