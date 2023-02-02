import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req)=> {
    if(localStorage.getItem("profile") ){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

// AUTH
export const signIn =(formData) => API.post("/user/signin", formData);
export const signUp =(formData) => API.post("/user/signup", formData);
export const changePassword =(formData, userId) => API.post(`/user/${userId}/change-password`, formData);

// REPO
export const createRepo =(formData) => API.post("/repos/create", formData);
export const joinRepo =(formData) => API.post("/repos/join", formData);
export const getOwnedRepos =(id) => API.get(`/repos/${id}/owned-repos`);
export const getJoinedRepos =(id) => API.get(`/repos/${id}/joined-repos`);

export const checkAndGetRepoWithId =(repoId, userId) => API.post(`/repos/${repoId}`, userId);




 