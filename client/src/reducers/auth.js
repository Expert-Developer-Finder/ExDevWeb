import { AUTH, LOGOUT, ERROR } from "../constants/actionTypes";

const authReducer = (state = {authData: null, error : false}, action)=> {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};

        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null, error: false};
        
        case ERROR:
            return { ...state, authData: action?.data , error: true};
            
        default:
            return state;
    }
}

export default authReducer;