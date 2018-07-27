// import { EMAIL_CHANGED } from '../actions/types';

// const INITIAL_STATE = { email:'' }

// export default (state= INITIAL_STATE, action) => {
//     switch(action.type) {
//         case EMAIL_CHANGED:
//          return { ...state, email: action.payload};
//         default: 
//         return state;
//     }
// };




import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL,
    LOGIN_USER 
}   from '../actions/types'; /*czesty blad - przy importcie niewlasciwej zmiennej nie wyswietla sie blad*/
const INITIAL_STATE = { email: '', password: '', user: null, error: '', loading: false};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {

        case EMAIL_CHANGED: 
              return { ...state, email: action.payload };

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };  

        case LOGIN_USER: 
            return { ...state, loading: true, error: ''};

        case LOGIN_USER_SUCCESS:
         
            return { ...state, ...INITIAL_STATE, user: action.payload };
            //console.log( 'succes', state.error );

        case LOGIN_USER_FAIL:
            
            return { ...state, error: 'authentication failed', loading: false };    
            //console.log( 'fail',state.error );
        default:
            return state;
    }
};