import firebase from 'firebase';
import { SIGNUP_USER, CATEGORIES_FETCH, CATEGORIES_FETCH_SUCCESS, CATEGORY_CREATED, SAVE_TOPIC, CUSTOM_CATEGORIES_FETCH_SUCCESS, TOPIC_CHANGED, CATEGORY_CHANGED } from './types';
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
        firebase.database().ref(`/users/${currentUser.uid}/categories/${category}`)
        .push({ category, topics })
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
            .on('value', snapshot =>  {
                
                if (snapshot.val() !== null)  { 

                    const data =  Object.values(snapshot.val())  
                    const arrays = data.map( e => Object.values(e))
                    const merged = [].concat.apply([], arrays);

                    return dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: merged }); 
                
                }
                else {
                    return dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: '' });
                } 

            });
    };
};

export const categoryDelete = ({ uid, clickedCategory }) => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/categories/${clickedCategory}`)
        .remove()
    };
};