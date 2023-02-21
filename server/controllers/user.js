import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

import Repo from "../models/repo.js";
import { returnContacts } from "./contact.js";

dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist!" });

    const isPwdCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPwdCorrect)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const checkIfPasswordIsStrong = (pwd) => {
  if (pwd.length < 8) return false;

  var hasCapital = false;
  if (/[A-Z]/.test(pwd)) hasCapital = true;
  if (!hasCapital) return false;

  var hasNumeric = false;
  for (var i = 0; i < pwd.length; i++)
    if (pwd.charAt(i) >= "0" && pwd.charAt(i) <= "9") hasNumeric = true;
  if (!hasNumeric) return false;

  return (
    pwd.includes("!") ||
    pwd.includes("@") ||
    pwd.includes("#") ||
    pwd.includes("&") ||
    pwd.includes("*") ||
    pwd.includes("$") ||
    pwd.includes(".")
  );
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist!" });

    // uncomment when you want to check for strong passwords

    //if (!checkIfPasswordIsStrong(password)) return res.status(400)
    //.json({message: "Your password should be at least 8 characters, should include at least one numeric character and one upper case letter, and should have one of these special chararcters: !@#$&*."});

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      bio: "",
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateBio = async (req, res) => {
  const { newBio, userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      bio: newBio,
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    var usersOwnedRepos = await getOwnedRepos({ userId: userId });
    for (const repoIdindex in usersOwnedRepos) {
      var isSuccessfull = await removeOwnerFromRepo({
        userId: userId,
        repoId: usersOwnedRepos[repoIdindex],
      });
      console.log(isSuccessfull);
      if (!isSuccessfull) {
        return res
          .status(400)
          .json(
            `Move the ownership in repo with ID${usersOwnedRepos[repoIdindex]} before deleting your account`
          );
      }
    }


    const user = await User.findByIdAndDelete(userId);
    res.status(200).json("User deleted successfully");
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getOwnedRepos = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    //res.status(200).json({ repos: user.owned_repos });
    return user.owned_repos;
  } catch (e) {
    console.log(e);
  }
};

export const removeOwnerFromRepo = async (req, res) => {
  const { userId, repoId } = req;
  console.log("checkmate1");
  console.log(repoId);

  try {
    const searchedRepo = await Repo.findById(repoId);
    console.log("checkmate2");
    if (
      searchedRepo.repoOwners.length == 1 &&
      searchedRepo.repoOwners[0] == userId
    ) {
      return false;
    } else {
      console.log(
        `remove owners form repo ${searchedRepo.repoOwners.length} ${searchedRepo.repoOwners[0]}`
      );
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { owned_repos: repoId },
      });
      const repo = await Repo.findByIdAndUpdate(repoId, {
        $pull: { repoOwners: userId },
      });
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

export const changePassword = async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword, newPasswordAgain } = req.body;

  if (newPassword === oldPassword)
    return res.status(405).json({
      message: "Enter a different new a password than your old password!",
    });
  if (newPassword !== newPasswordAgain)
    return res
      .status(405)
      .json({ message: "Newly entered passwords don't match!" });

  try {
    const currentUser = await User.findOne({ _id: userId });
    const isPwdCorrect = await bcrypt.compare(
      oldPassword,
      currentUser.password
    );

    if (!isPwdCorrect)
      return res.status(400).json({ message: "Old password is incorrect!" });

    //if (!checkIfPasswordIsStrong(newPassword)) return res.status(400)
    //.json({message: "Your password should be at least 8 characters, should include at least one numeric character and one upper case letter, and should have one of these special chararcters: !@#$&*."});

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    currentUser.password = hashedPassword;
    await User.findByIdAndUpdate(currentUser._id.valueOf(), currentUser, {
      new: true,
    });

    res.status(200).json({ message: "Password changed succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res
      .status(200)
      .json({ message: "User returned succesfully", result: user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).then((user) => user);
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const promoteMember = async (req, res) => {
  const { userId, ownerId, repoId } = req.body;
  try {
    const repo = await Repo.findById(repoId);

    const repoOwners = repo.repoOwners;
    const isPromoterValid = repoOwners.includes(ownerId);

    if (isPromoterValid) {
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { joined_repos: repoId },
        $push: { owned_repos: repoId },
      });

      const repo = await Repo.findByIdAndUpdate(repoId, {
        $push: { repoOwners: userId },
        $pull: { members: userId },
      });

      res.status(200).json({ message: "Promoted Succesfully" });
    } else {
      res.status(401).json({ message: "Not authorized to promote" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const demoteOwner = async (req, res) => {
  const { userId, ownerId, repoId } = req.body;

  try {
    const repo = await Repo.findById(repoId);

    const repoOwners = repo.repoOwners;
    const isDemoterValid = repoOwners.includes(ownerId);

    if (isDemoterValid) {
      const user = await User.findByIdAndUpdate(userId, {
        $push: { joined_repos: repoId },
        $pull: { owned_repos: repoId },
      });

      const repo = await Repo.findByIdAndUpdate(repoId, {
        $pull: { repoOwners: userId },
        $push: { members: userId },
      });

      res.status(200).json({ message: "Demoted Succesfully" });
    } else {
      res.status(401).json({ message: "Not authorized to demote" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getContacts = async (req, res) => {
  const { userId, repoId } = req.body;
  var contacts = [];
  try {
    var contactList = await returnContacts({
      body: { userId: userId, repoId: repoId },
    });

    for (let i = 0; i < contactList.length; i++) {
      contacts.push(contactList[i]);
    }

    res.status(200).json({ contacts: contacts });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!!" });
  }
};
