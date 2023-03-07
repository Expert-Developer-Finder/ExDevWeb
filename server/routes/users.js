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
  getAllUsers,
  getRepos,
  updateProfile
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/promote", promoteMember);
userRouter.post("/demote", demoteOwner);

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.put("/update-bio", updateBio);
userRouter.delete("/delete-user", deleteAccount);
userRouter.get("/owned-repos", getOwnedRepos);

userRouter.post("/contacts", getContacts);
userRouter.post("/repos", getRepos);
userRouter.get("/all", getAllUsers);
userRouter.get("/", getUser);



/**
 * getContacts
 * removeContact
 * addContact
 * rateUser
 **/ 



userRouter.post("/:userId/change-password", changePassword);
userRouter.post("/:userId/update-profile", updateProfile);


userRouter.post("/:userId", getUserById);

export default userRouter;
