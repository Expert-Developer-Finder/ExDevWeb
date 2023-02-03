import Repo from "../models/repo.js";
import User from "../models/user.js";
import fetch from "node-fetch";

export const createRepo = async (req, res) => {
  const { repoURL, creator, userId } = req.body;
  const raw = repoURL.substr(19).split("/");
  const ownerName = raw[0];
  const repoName = raw[1];

  //TODO

  // Check if the repo already exists

  // Check if the repo is in GitHub
  var response = await checkIfRepoExistsInGithub({ repoURL: repoURL });
  if (response == true) {
    res.status(200).json({ message: "Success" });
  } else {
    res.status(409).json({ message: "This is not a valid repoURL" });
    return;
  }

  // Create the repository, add the creator as a member and repository owner
  const newRepo = new Repo({
    creator,
    ownerName,
    repoName,
    repoURL,
    createdAt: new Date().toISOString(),
  });
  newRepo.members.push(creator); // Add member (creator)
  newRepo.repoOwners.push(creator); // Make Repo Owner (creator)

  try {
    await newRepo.save();
    // Add repo id to user's joined_repos array
    const newRepoId = newRepo._id.valueOf();
    const user = await User.findById(userId);
    user.owned_repos.push(newRepoId);

    try {
      await User.findByIdAndUpdate(userId, user, { new: true });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(newRepo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRepo = async (req, res) => {
  const repo = await Repo.findById(req.params.id)
    .then((repo) => res.json(repo))
    .catch((error) => res.json(error));
};

/*Be careful addMember returns the previous repo object(added member is not shown due to findByIdAndUpdate method)*/
export const addMember = async (req, res) => {
  try {
    const memberId = req.body.memberId;
    const repoId = req.body.id;
    const repo = await Repo.findByIdAndUpdate(repoId, {
      $push: { members: memberId },
    });
    res.json(repo);
  } catch (error) {
    console.error(error.message);
    res.send(400).send("Server Error");
  }
};

export const addRepoOwner = async (req, res) => {
  try {
    const userId = req.body.userId;
    const repoId = req.body.id;
    const repo = await Repo.findByIdAndUpdate(repoId, {
      $push: { repoOwners: userId },
    });
    res.json(repo);
  } catch (error) {
    console.error(error.message);
    res.send(400).send("Server Error");
  }
};

export const checkIfRepoExists = async (req, res) => {
  const repoId = req.body.id;
  Repo.countDocuments({ _id: repoId }, function (err, count) {
    if (err) {
      console.log(err);
    } else {
      if (count > 0) {
        //document exists });
        console.log(count);
        res.send(count.toString());
      } else {
        res.send(count.toString());
      }
    }
  });
};

export const getOwnedRepos = async (req, res) => {
  const { userId } = req.params;

  try {
    const ownedRepos = await Repo.find({
      repoOwners: { $in: userId },
    });

    res.status(200).json({ data: ownedRepos });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const checkIfRepoExistsInGithub = async (req, res) => {
  console.log(req.repoURL);
  const { repoURL } = req;
  const userSlashRepo = repoURL.substr(19);
  const url = `https://api.github.com/repos/${userSlashRepo}`;

  const response = await fetch(url);
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status == 200) {
      return true;
    } else if (response.status == 404) {
      return false;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
