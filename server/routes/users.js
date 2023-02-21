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
<<<<<<< HEAD
  getContacts,
=======
  getAllUsers
>>>>>>> 413ee84323a2b7d162d8d41c28dc26e82af4af63
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/promote", promoteMember);
userRouter.post("/demote", demoteOwner);

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.put("/update-bio", updateBio);
userRouter.delete("/delete-user", deleteAccount);
userRouter.get("/owned-repos", getOwnedRepos);
<<<<<<< HEAD
userRouter.get("/contacts", getContacts);
userRouter.get("/", getUser);

=======

userRouter.get("/all", getAllUsers);

userRouter.get("/", getUser);

/**
 * getContacts
 * removeContact
 * addContact
 * rateUser
 **/ 


>>>>>>> 413ee84323a2b7d162d8d41c28dc26e82af4af63
userRouter.post("/:userId/change-password", changePassword);
userRouter.post("/:userId", getUserById);

export default userRouter;
