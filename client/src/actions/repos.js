import * as api from "../api";
import {   ERROR, JOIN_REPO, CREATE_REPO, GET_OWNED_REPOS, GET_JOINED_REPOS, LOGOUT} from "../constants/actionTypes";
import {restoreUser} from "./auth";


const errorHandling = (error) => {
  console.log("An error occured:");
  const errMsg = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  console.log(errMsg);
  return errMsg;
}


export const joinRepo = (formData, history, userId) => async (dispatch) => {
  try {
    var {data} = await api.joinRepo(formData);
    await dispatch({ type: JOIN_REPO, payload: data });
    await dispatch(restoreUser(userId));
    history.push("/");

  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};


export const createRepo = (formData, history) => async (dispatch) => {
  try {
    const  {data} = await api.createRepo(formData);
    dispatch({ type: CREATE_REPO, payload: data });

    history.push("/");
  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const getOwnedRepos = (id) => async (dispatch) => {
  try {
    const  {data: ownedRepos}  = await api.getOwnedRepos(id);
    dispatch({ type: GET_OWNED_REPOS, ownedRepos });

  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};


export const getJoinedRepos = (id) => async (dispatch) => {
  try {
    const  {data: joinedRepos}  = await api.getJoinedRepos(id);

    console.log(joinedRepos);
    dispatch({ type: GET_JOINED_REPOS, joinedRepos });

  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const changeSharedPass = (formData, repoId, setSelectedRoute) => async (dispatch) => {
  try {
    const {data} = await api.changeSharedPass(formData, repoId);
    console.log(data.message);
    alert(data.message);
    setSelectedRoute("/");

  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const acceptJoinRequest = ( repoId, userId, setSelectedRoute) => async (dispatch) => {
  try {
    const {data} = await api.acceptJoinRequest( repoId, {userId:userId});
    console.log(data.message);
    alert(data.message);
    window.location.reload(true);

  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};

export const rejectJoinRequest = ( repoId, userId, setSelectedRoute) => async (dispatch) => {
  try {
    const {data} = await api.rejectJoinRequest( repoId,  {userId:userId});
    console.log(data.message);
    alert(data.message);
    window.location.reload(true);

  } catch (error) {
    const errMsg = errorHandling(error);
    dispatch({ type: ERROR, data: errMsg });
  }
};