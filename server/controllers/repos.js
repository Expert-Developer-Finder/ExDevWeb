import Repo from "../models/repo.js";
import User from "../models/user.js";
import fetch from "node-fetch";

export const createRepo = async (req, res) => {
  const { repoURL, creator } = req.body;

  const raw = repoURL.substr(19).split("/");
  const ownerName = raw[0];
  const repoName = raw[1];

  //TODO

  // Check if the repo already exists in our DB
  const repos = await Repo.find({repoURL: repoURL});
  
  if(repos.length ) {
    return res.status(405).json({ message: "This repository already has been created!" });
  }

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
  // newRepo.members.push(creator); // Add member (creator)
  newRepo.repoOwners.push(creator); // Make Repo Owner (creator)

  try {
    await newRepo.save();
    // Add repo id to user's joined_repos array
    const newRepoId = newRepo._id.valueOf();
    const user = await User.findById(creator);
    user.owned_repos.push(newRepoId);

    try {
        await User.findByIdAndUpdate(creator, user, {new: true});
    } catch (error) {console.log(error);}


    res.status(201).json(newRepo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const joinRepo = async (req, res) => {
  const { repoURL, password, ownerName,  repoName, isChecked : willSendJoinRequest, userId: newMemberId} = req.body;

  try {
    // find repo 
    if (repoURL.length && (ownerName.length || repoName.length) ) {
      return res.status(405).json({ message: "Enter only repository owner and name as a pair, or the repository URL!" });
    } 
    let repos;
    if (!repoURL.length ) {
      repos = await Repo.find({repoURL: `https://github.com/${ownerName}/${repoName}`});

    } else {
      repos = await Repo.find({repoURL: repoURL});
    }

    // check if repo exist
    if(repos.length == 0) {
      return res.status(404).json({ message: "No such a repositry has been found!" });
    }

    // Get the repo & repoId & user
    const repo = repos[0];
    const repoId = repo._id.valueOf();
    const user = await User.findById(newMemberId);

    // Check if the member has already joined to the repository
    if(repo.members.includes(newMemberId)) {
      return res.status(405).json({ message: "You are already a member of this repository!" });
    }


    // JOIN WITH PASSWORD
    if (!willSendJoinRequest) {
      // Add the member to repos members list
      repo.members.push(newMemberId);
      
      // find user and add the repo to his joined repos
      user.joined_repos.push(repoId);

      // update the moruqs
      await User.findByIdAndUpdate(newMemberId, user, {new: true});
      await Repo.findByIdAndUpdate(repoId, repo, {new: true});
    } 
    
    // SEND A JOINING REQUEST
    else {

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
  const {userId} = req.params;

  try {
      const ownedRepos = await Repo.find({
        repoOwners:{$in: userId}
      });

      res.status(200).json({data: ownedRepos});
  } catch(err) {
      res.status(500).json({message: "Something went wrong!"});
  }
  
}

export const getJoinedRepos = async (req, res) => {
  const {userId} = req.params;

  try {
      const joinedRepos = await Repo.find({
        members:{$in: userId}
      });

      res.status(200).json({data: joinedRepos});
  } catch(err) {
      res.status(500).json({message: "Something went wrong!"});
  }
  
}

export const checkAndGetRepoWithId = async  (req, res) => {
  const {repoId} = req.params;
  const {userId} = req.body;
 
  try {
    const repo = await Repo.findById(repoId);
    if (!repo.members.includes(userId) && !repo.repoOwners.includes(userId) ) return res.status(401).json({ message: "Unauthorised acces!" });
  
    res.status(200).json({data: repo});
    
  } catch (error) {
    res.status(500).json({message: "Something went wrong!"});
  }


}


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
