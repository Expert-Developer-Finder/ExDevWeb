import { JOIN_REPO, ERROR, CREATE_REPO, GET_OWNED_REPOS, GET_JOINED_REPOS, CLEAR_ERROR } from "../constants/actionTypes";

const reposReducer = (state = {ownedRepos: [] , joinedRepos: [], error : false, errorMessage: null}, action)=> {
    switch (action.type) {
        case ERROR:
            return { ...state, error: true, errorMessage : action?.data};
        case CLEAR_ERROR:
            return { ...state, error: false, errorMessage : null};
        case CREATE_REPO:
            return {...state, ownedRepos: [...state.ownedRepos, action.payload]}; 
        case JOIN_REPO:
            return {...state, joinedRepos: [...state.joinedRepos, action.payload]}; 
        case GET_OWNED_REPOS: 
            return {...state, ownedRepos: action.ownedRepos}; 
        case GET_JOINED_REPOS: 
            return {...state, joinedRepos: action.joinedRepos}; 
        default:
            return state;
    }
}

export default reposReducer;