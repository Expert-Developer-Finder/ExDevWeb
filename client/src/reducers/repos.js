import { EXAMPLE_JOIN, ERROR } from "../constants/actionTypes";

const reposReducer = (state = {repos: [], error : false}, action)=> {
    switch (action.type) {
        case ERROR:
            return { ...state, error: true};
        case EXAMPLE_JOIN:
            return {...state, repos: [...state.repos, action.payload]}; 
        default:
            return state;
    }
}

export default reposReducer;