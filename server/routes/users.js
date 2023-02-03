
import express from "express";

import {
  deleteAccount,
  signin,
  signup,
  updateBio,
  changePassword,
  getOwnedRepos,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.post("/:userId/change-password", changePassword);

userRouter.put("/update-bio", updateBio);
userRouter.delete("/delete-user", deleteAccount);
userRouter.get("/owned-repos", getOwnedRepos);

export default userRouter;
