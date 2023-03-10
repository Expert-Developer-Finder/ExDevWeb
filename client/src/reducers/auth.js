import { AUTH, LOGOUT, ERROR, RESTORE } from "../constants/actionTypes";

const authReducer = (state = {authData: null, error : false}, action)=> {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action?.data, error: false};

        case RESTORE:
            const storage = JSON.parse( localStorage.getItem("profile"))
            storage.result = action.user;
            localStorage.setItem("profile", JSON.stringify(storage));
            return {...state, authData: action?.user, error: false};

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