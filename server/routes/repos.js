import express from "express";
import {
  addMember,
  createRepo,
  getRepo,
  addRepoOwner,
  getOwnedRepos,
  joinRepo,
  getJoinedRepos,
  checkAndGetRepoWithId,
  checkIfRepoExists,
  checkIfRepoExistsInGithub,
  changeSharedPass,
  acceptJoinRequest,
  rejectJoinRequest,
  getJoinedMembers,
  getRepoOwners,
  getRandomX,
  getAllRepos,
  getReposBranches,
  getRepoName,
  updateStatus,
  updateWeights,
  getWeights
} from "../controllers/repos.js";

const repoRouter = express.Router();

repoRouter.post("/create", createRepo);
repoRouter.post("/join", joinRepo);
repoRouter.post("/get-weights", getWeights);

repoRouter.post(`/:repoId`, checkAndGetRepoWithId);
repoRouter.post(`/:repoId`, checkAndGetRepoWithId);
repoRouter.post(`/:repoId/change-shared-pass`, changeSharedPass);
repoRouter.post(`/:repoId/accept-join-request`, acceptJoinRequest);
repoRouter.post(`/:repoId/reject-join-request`, rejectJoinRequest);
repoRouter.get("/:repoId/joined-members", getJoinedMembers);
repoRouter.get("/:repoId/repo-owners", getRepoOwners);
repoRouter.get("/:repoId/get-random", getRandomX);

//repoRouter.get("/check-if-exists-in-github", checkIfRepoExistsInGithub);

repoRouter.get("/check-if-exists", checkIfRepoExists);
repoRouter.get("/:userId/owned-repos", getOwnedRepos);
repoRouter.get("/:userId/joined-repos", getJoinedRepos);
repoRouter.post("/:repoOwner/:repoName/branches", getReposBranches);
repoRouter.post("/:repoOwner/:repoName/update-status", updateStatus);
repoRouter.post("/:repoOwner/:repoName/set-weights", updateWeights);




repoRouter.get("/all", getAllRepos);
repoRouter.put("/add-member", addMember);

repoRouter.put("/add-repo-owner", addRepoOwner);
repoRouter.get("/name/:id", getRepoName);

repoRouter.get("/:id", getRepo);

export default repoRouter;
