import express from "express";

import {
  deleteAccount,
  signin,
  signup,
  updateBio,
  changePassword,
  getOwnedRepos,
  getUserById,
  getUser,
  promoteMember,
  demoteOwner,
  getContacts,
} from "../controllers/user.js";

const userRouter = express.Router();
userRouter.post("/promote", promoteMember);
userRouter.post("/demote", demoteOwner);

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.put("/update-bio", updateBio);
userRouter.delete("/delete-user", deleteAccount);
userRouter.get("/owned-repos", getOwnedRepos);
userRouter.get("/contacts", getContacts);
userRouter.get("/", getUser);

userRouter.post("/:userId/change-password", changePassword);
userRouter.post("/:userId", getUserById);

export default userRouter;
