import express from "express";

import {
  deleteAccount,
  signin,
  signup,
  updateBio,
  getOwnedRepos,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.put("/update-bio", updateBio);
userRouter.delete("/delete-user", deleteAccount);
userRouter.get("/owned-repos", getOwnedRepos);

export default userRouter;
