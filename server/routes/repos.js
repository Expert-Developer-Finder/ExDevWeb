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
  changeSharedPass
} from "../controllers/repos.js";

const repoRouter = express.Router();

repoRouter.post("/create", createRepo);
repoRouter.post("/join", joinRepo);
repoRouter.post(`/:repoId`, checkAndGetRepoWithId);
repoRouter.post(`/:repoId`, checkAndGetRepoWithId);
repoRouter.post(`/:repoId/change-shared-pass`, changeSharedPass);



//repoRouter.get("/check-if-exists-in-github", checkIfRepoExistsInGithub);

repoRouter.get("/check-if-exists", checkIfRepoExists);
repoRouter.get("/:userId/owned-repos", getOwnedRepos);
repoRouter.get("/:userId/joined-repos", getJoinedRepos);

repoRouter.put("/add-member", addMember);

repoRouter.put("/add-repo-owner", addRepoOwner);
repoRouter.get("/:id", getRepo);

export default repoRouter;
