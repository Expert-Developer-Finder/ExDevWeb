import express from "express";

import {
  addMember,

  createRepo,
  getRepo,
  addRepoOwner,
  getOwnedRepos,
  joinRepo,
  getJoinedRepos
} from "../controllers/repos.js";

const repoRouter = express.Router();

repoRouter.post("/create", createRepo);
repoRouter.post("/join", joinRepo);

repoRouter.get("/:userId/owned-repos", getOwnedRepos);
repoRouter.get("/:userId/joined-repos", getJoinedRepos);


repoRouter.put("/add-member", addMember);

repoRouter.put("/add-repo-owner", addRepoOwner);
repoRouter.get("/:id", getRepo);

export default repoRouter;
