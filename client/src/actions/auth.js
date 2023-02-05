import * as api from "../api";
import { AUTH , ERROR} from "../constants/actionTypes";

const errorHandle = (error)=> {
  console.log("An error occured:");
  const errMsg = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  console.log(errMsg);
  return errMsg
}

export const signin = (formData, history) => async (dispatch) => {
  try {
    const  {data} = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    const errMsg = errorHandle(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const  {data}  = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    const errMsg = errorHandle(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const changePassword = (formData, history, userId) => async (dispatch) => {
  try {
    const {data} = await api.changePassword(formData, userId);
    console.log(data.message);
    alert(data.message);
    history.push("/");


  } catch (error) {
    const errMsg = errorHandle(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const restoreUser = (userId) => async (dispatch) => {
  try {
    const {data} = await api.getUserById( userId);
    dispatch({ type: AUTH, data });

  } catch (error) {
    const errMsg = errorHandle(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};




