import * as api from "../api";
import {   ERROR, EXAMPLE_JOIN, CREATE_REPO, GET_OWNED_REPOS} from "../constants/actionTypes";



export const joinRepo = (formData, history) => async (dispatch) => {
  try {
    var res = await api.joinRepo(formData);
    console.log(res);
    return;


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


export const createRepo = (formData, history) => async (dispatch) => {
  try {
    const  {data} = await api.createRepo(formData);
    dispatch({ type: CREATE_REPO, payload: data });

    history.push("/");
  } catch (error) {
    console.log("An error occured during joining repository:");
    const errMsg = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    console.log(errMsg);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const getOwnedRepos = (id) => async (dispatch) => {
  try {
    const  {data: ownedRepos}  = await api.getOwnedRepos(id);
    //console.log(ownedRepos);
    dispatch({ type: GET_OWNED_REPOS, ownedRepos });

  } catch (error) {
    console.log("An error occured during login:");
    const errMsg = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    console.log(errMsg);
    dispatch({ type: ERROR, data: errMsg });
  }
};