import { EXAMPLE_JOIN, ERROR, CREATE_REPO, GET_OWNED_REPOS } from "../constants/actionTypes";

const reposReducer = (state = {ownedRepos: [] , joinedRepos: [], error : false}, action)=> {
    switch (action.type) {
        case ERROR:
            return { ...state, error: true};
        case CREATE_REPO:
            return {...state, ownedRepos: [...state.ownedRepos, action.payload]}; 
        case GET_OWNED_REPOS: 
        console.log(action);
            return {...state, ownedRepos: action.ownedRepos}; 
        default:
            return state;
    }
}

export default reposReducer;