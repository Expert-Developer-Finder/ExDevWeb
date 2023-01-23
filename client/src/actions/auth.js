import * as api from "../api";
import { AUTH , ERROR} from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const  {data} = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log("An error occured during login:");
    const errMsg = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    console.log(errMsg);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const  {data}  = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log("An error occured during login:");
    const errMsg = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    console.log(errMsg);
    dispatch({ type: ERROR, data: errMsg });
  }
};
