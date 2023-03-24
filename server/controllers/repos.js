import Repo from "../models/repo.js";
import User from "../models/user.js";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { getUser } from "./user.js";
import dotenv from "dotenv";

dotenv.config();

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

export const createRepo = async (req, res) => {
  const { repoURL, creator, sharedPass } = req.body;

  //if (!checkIfPasswordIsStrong(sharedPass)) return res.status(400)
  //.json({message: "Your password should be at least 8 characters, should include at least one numeric character and one upper case letter, and should have one of these special chararcters: !@#$&*."});

  const hashedPassword = await bcrypt.hash(sharedPass, 12);

  const raw = repoURL.substr(19).split("/");
  const ownerName = raw[0];
  const repoName = raw[1];

  
  // Check if the repo already exists in our DB
  const repos = await Repo.find({ repoURL: repoURL });

  if (repos.length) {
    return res
      .status(405)
      .json({ message: "This repository already has been created!" });
  }

  // Check if the repo is in GitHub
  const checkAPIUrl = `https://api.github.com/repos/${ownerName}/${repoName}`;

  // First check if it a public repo
  const checkApiRes = await fetch(checkAPIUrl);  
  if (checkApiRes.status != 200) {

    // Then may be it is a private repo of mine
    const config = {
      headers: { Authorization: `Bearer ${creator.githubPAT}` },
    };

    const checkApiRes2 = await fetch(checkAPIUrl, config); 

    if (checkApiRes2.status != 200) {
      return res
      .status(404)
      .json({ message: "This is not a valid repository url" });
    }
  }
    
  // Create the repository, add the creator as a member and repository owner
  const newRepo = new Repo({
    sharedPass: hashedPassword,
    creator: creator._id,
    ownerName,
    repoName,
    repoURL,
    createdAt: new Date().toISOString(),
  });

  newRepo.repoOwners.push(creator); // Make Repo Owner (creator)

  try {
    await newRepo.save();
    // Add repo id to user's joined_repos array
    const newRepoId = newRepo._id.valueOf();
    const user = await User.findById(creator);
    user.owned_repos.push(newRepoId);

    try {
      await User.findByIdAndUpdate(creator, user, { new: true });
    } catch (error) {
      console.log(error);
    }

    // TODO: token lar alınacak
    // at this point, we can start creating the graph at Neo4j
    fetch(`${process.env.GRAPH_BASE_URL}/graph/create`, {
      method: "POST",
      body: JSON.stringify(
        {
          "repoOwner": ownerName,
          "repoName" : repoName,
          "tokens": [creator.githubPAT],
          "branch": "main"
        }
      ),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    }) 
    res.status(201).json(newRepo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const changeSharedPass = async (req, res) => {
  const { repoId } = req.params;
  const { oldPassword, newPassword, newPasswordAgain } = req.body;

  if (newPassword !== newPasswordAgain)
    return res
      .status(405)
      .json({ message: "Newly entered shared passes  don't match!" });

  try {
    const currentRepo = await Repo.findOne({ _id: repoId });
    const isPwdCorrect = await bcrypt.compare(
      oldPassword,
      currentRepo.sharedPass
    );

    if (!isPwdCorrect)
      return res.status(400).json({ message: "Old shared pass is incorrect!" });

    //if (!checkIfPasswordIsStrong(newPassword)) return res.status(400)
    //.json({message: "Your shared pass should be at least 8 characters, should include at least one numeric character and one upper case letter, and should have one of these special chararcters: !@#$&*."});

    if (newPassword === oldPassword)
      return res.status(405).json({
        message: "Enter a new shared pass different than your old one!",
      });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    currentRepo.sharedPass = hashedPassword;
    await Repo.findByIdAndUpdate(repoId, currentRepo, { new: true });

    res.status(200).json({ message: "Shared Pass changed succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const joinRepo = async (req, res) => {
  const {
    repoURL,
    password: sharedPass,
    ownerName,
    repoName,
    isChecked: willSendJoinRequest,
    userId: newMemberId,
  } = req.body;

  try {
    // find repo
    if (repoURL.length && (ownerName.length || repoName.length)) {
      return res.status(405).json({
        message:
          "Enter only repository owner and name as a pair, or the repository URL!",
      });
    }
    let repos;

    let obtainedRepoName;
    let obtainedRepoOwner;
    let obtainedRepoURL;
    if (!repoURL.length) {
      // we don't have the repo url
      obtainedRepoURL = `https://github.com/${ownerName}/${repoName}`;
      obtainedRepoName = repoName;
      obtainedRepoOwner = ownerName;
      repos = await Repo.find({ repoURL: obtainedRepoURL });
    } else {
      obtainedRepoURL = repoURL;
      const trimmedURL = repoURL.substring(19);
      const a = trimmedURL.split("/");
      obtainedRepoOwner = a[0];
      obtainedRepoName = a[1];
      repos = await Repo.find({ repoURL: repoURL });
    }

    // check if repo exist
    if (repos.length == 0) {
      return res
        .status(404)
        .json({ message: "No such a repositry has been found!" });
    }

    // Get the repo & repoId & user
    const repo = repos[0];
    const repoId = repo._id.valueOf();
    const user = await User.findById(newMemberId);

    // Check if the member has already joined to the repository
    if (repo.members.includes(newMemberId)) {
      return res
        .status(405)
        .json({ message: "You are already a member of this repository!" });
    }

    // JOIN WITH PASSWORD
    if (!willSendJoinRequest) {
      // Add the member to repos members list
      repo.members.push(newMemberId);

      const isSharedPassCorrect = await bcrypt.compare(
        sharedPass,
        repo.sharedPass
      );
      if (!isSharedPassCorrect)
        return res.status(401).json({ message: "Wrong shared pass!" });

      // find user and add the repo to his joined repos
      user.joined_repos.push(repoId);

      // update the moruqs
      await User.findByIdAndUpdate(newMemberId, user, { new: true });
      await Repo.findByIdAndUpdate(repoId, repo, { new: true });
    }

    // SEND A JOINING REQUEST
    else {
      const newJoinRequest = {
        userId: newMemberId,
        userName: user.name,
        repoId,
        repoName: obtainedRepoName,
        repoURL: obtainedRepoURL,
        ownerName: obtainedRepoOwner,
      };

      repo.join_requests.push(newJoinRequest);
      user.join_requests.push(newJoinRequest);

      // TODO çok istersen adam bir requesti varkene bi daha request atamasın diye bakabilirsin

      await User.findByIdAndUpdate(newMemberId, user, { new: true });
      await Repo.findByIdAndUpdate(repoId, repo, { new: true });
    }

    res.status(201).json(repo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRepo = async (req, res) => {
  const repo = await Repo.findById(req.params.id)
    .then((repo) => res.json(repo))
    .catch((error) => res.json(error));
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

export const getJoinedRepos = async (req, res) => {
  const { userId } = req.params;

  try {
    const joinedRepos = await Repo.find({
      members: { $in: userId },
    });

    res.status(200).json({ data: joinedRepos });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const checkAndGetRepoWithId = async (req, res) => {
  const { repoId } = req.params;
  const { userId } = req.body;

  try {
    const repo = await Repo.findById(repoId);
    if (!repo.members.includes(userId) && !repo.repoOwners.includes(userId))
      return res.status(401).json({ message: "Unauthorised acces!" });

    res.status(200).json({ data: repo });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
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

export const checkIfRepoExistsInGithub = async (req, res) => {
  const { repoURL } = req;
  const userSlashRepo = repoURL.substr(19);
  const url = `https://api.github.com/repos/${userSlashRepo}`;

  try {
    const response = await fetch(url);
    if (response.status == 200) return true;

    return false;
  } catch (err) {
    return false;
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

export const acceptJoinRequest = async (req, res) => {
  const { userId } = req.body;
  const { repoId } = req.params;

  try {
    const repo = await Repo.findById(repoId);
    const user = await User.findById(userId);

    repo.members.push(userId);
    user.joined_repos.push(repoId);

    const filteredRequests = repo.join_requests.filter(
      (request) => !(request.repoId == repoId && request.userId === userId)
    );
    repo.join_requests = filteredRequests;

    const filteredRequests2 = user.join_requests.filter(
      (request) => !(request.repoId == repoId && request.userId === userId)
    );
    user.join_requests = filteredRequests2;

    console.log(filteredRequests);
    await Repo.findByIdAndUpdate(repoId, repo, { new: true });
    await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json({ message: "Member accepted to repository!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectJoinRequest = async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  const { repoId } = req.params;

  try {
    const repo = await Repo.findById(repoId);
    const user = await User.findById(userId);

    const filteredRequests = repo.join_requests.filter(
      (request) => !(request.repoId == repoId && request.userId === userId)
    );
    repo.join_requests = filteredRequests;

    const filteredRequests2 = user.join_requests.filter(
      (request) => !(request.repoId == repoId && request.userId === userId)
    );
    user.join_requests = filteredRequests2;

    await Repo.findByIdAndUpdate(repoId, repo, { new: true });
    await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json({ message: "Member rejected from repository!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJoinedMembers = async (req, res) => {
  const { repoId } = req.params;
  var memberList = [];
  try {
    const repo = await Repo.findById(repoId);
    for (let i = 0; i < repo.members.length; i++) {
      const joinedMember = await getUser({
        body: { id: repo.members[i] },
      });
      memberList.push(joinedMember);
    }

    res.status(200).json({ joinedMembers: memberList });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getRepoOwners = async (req, res) => {
  const { repoId } = req.params;
  var ownerList = [];
  try {
    const repo = await Repo.findById(repoId);
    for (let i = 0; i < repo.repoOwners.length; i++) {
      const owner = await getUser({
        body: { id: repo.repoOwners[i] },
      });
      ownerList.push(owner);
    }
    res.status(200).json({ repoOwners: ownerList });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getRandomX = async (req, res) => {
  const { repoId } = req.params;
  var ownerList = [];
  var memberList = [];
  var count = 3;

  try {
    const repo = await Repo.findById(repoId);
    for (let i = 0; i < repo.repoOwners.length; i++) {
      const owner = await getUser({
        body: { id: repo.repoOwners[i] },
      });
      ownerList.push(owner);
    }
    for (let i = 0; i < repo.members.length; i++) {
      const member = await getUser({
        body: { id: repo.members[i] },
      });
      memberList.push(member);
    }

    var allContributors = memberList.concat(ownerList);
    var selectedContributors = memberList.concat(ownerList);
    console.log(allContributors.length);
    if (allContributors.length > count) {
      selectedContributors = getUnique(count, allContributors);
    }

    res.status(200).json({ randomContributors: selectedContributors });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

function getUnique(count, arr) {
  // Make a copy of the array
  var tmp = arr.slice(arr);
  var ret = [];

  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}
export const getAllRepos = async (req, res) => {
  try {
    Repo.find({}, function(err, repos) {
      var repoArr = [];
  
      repos.forEach(function(repo) {
        repoArr.push(repo);
      });
  
      res.send(repoArr);  
    });
  } catch (e) {
    console.log(e);
  }
};

export const getReposBranches = async (req, res) => {
  const {repoOwner, repoName} = req.params;
  const  {token} = req.body;

  try {

    let branches; 
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/branches`, config)
    .then(async res => {
      if ( res.status == 404) {
        return;
      } else {
        branches =  await res.json();
      }
    })

    return res.status(200).json(branches)
  } catch (e) {
    console.log(e);
    return res.status(404).json({"message": "Something went wrong"})
  }


};

