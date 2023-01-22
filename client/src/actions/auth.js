import { AUTH } from "../constants/actionTypes";

export const signin = () => async (dispatch) => {
    try {
        const data = {name:"ege", id: "1"};
        dispatch({type: AUTH, data});
        
    } catch (error) {
        console.log(error);
    }
}

export const signup = () => async (dispatch) => {
    try {
        const data = {name:"ege", id: "1"};
        dispatch({type: AUTH, data});        
    } catch (error) {
        console.log(error);
    }
}
