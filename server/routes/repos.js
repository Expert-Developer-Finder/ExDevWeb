import express from "express";
import {
  addMember,
  checkIfRepoExists,
  createRepo,
  getRepo,
  addRepoOwner,
} from "../controllers/repos.js";

const repoRouter = express.Router();

repoRouter.post("/create", createRepo);
repoRouter.get("/check-if-exists", checkIfRepoExists);

repoRouter.put("/add-member", addMember);

repoRouter.put("/add-repo-owner", addRepoOwner);
repoRouter.get("/:id", getRepo);

export default repoRouter;
