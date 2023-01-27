import * as api from "../api";
import {   ERROR, EXAMPLE_JOIN} from "../constants/actionTypes";



export const joinRepo = (formData, history) => async (dispatch) => {
  try {
   // const  {data} = await api.signIn(formData);

    var data = {};
    data["ownerName"] = formData.ownerName;
    data["repoName"] = formData.repoName;
    dispatch({ type: EXAMPLE_JOIN, payload: data });

    //history.push("/");
  } catch (error) {
    console.log("An error occured during joining repository:");
    const errMsg = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    console.log(errMsg);
    dispatch({ type: ERROR, data: errMsg });
  }
};


