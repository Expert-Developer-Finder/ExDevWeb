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
export const getUserById =(userId) => API.post(`/user/${userId}`);
export const changePassword =(formData, userId) => API.post(`/user/${userId}/change-password`, formData);
export const updateProfile =(formData, userId) => API.post(`/user/${userId}/update-profile`, formData);
export const promote = (data) => API.post("/user/promote" , data);
export const demote = (data) => API.post("/user/demote" , data);

// REPO
export const createRepo =(formData) => API.post("/repos/create", formData);
export const joinRepo =(formData) => API.post("/repos/join", formData);
export const getOwnedRepos =(id) => API.get(`/repos/${id}/owned-repos`);
export const getJoinedRepos =(id) => API.get(`/repos/${id}/joined-repos`);
export const changeSharedPass =(formData, repoId) => API.post(`/repos/${repoId}/change-shared-pass`, formData);
export const acceptJoinRequest =( repoId, userId) => API.post(`/repos/${repoId}/accept-join-request`, userId );
export const rejectJoinRequest =( repoId, userId) => API.post(`/repos/${repoId}/reject-join-request`, userId );
export const getJoinedMembers =( repoId) => API.get(`/repos/${repoId}/joined-members` );
export const getRepoOwners =( repoId) => API.get(`/repos/${repoId}/repo-owners` );
export const checkAndGetRepoWithId =(repoId, userId) => API.post(`/repos/${repoId}`, userId);
export const getQueriesOfARepo =(repoId) => API.post(`/query/getWithRepoId`, repoId);
export const getStats =(repoId) => API.post(`/query/getStats`, repoId);
export const getBranches =(repoOwner, repoName, token) => API.post(`/repos/${repoOwner}/${repoName}/branches`, token);




 