import Repo from "../models/repo.js";
import User from "../models/user.js";

export const createRepo = async (req, res) => {
  const { repoURL, creator } = req.body;
  const raw = repoURL.substr(19).split("/");
  const ownerName = raw[0];
  const repoName = raw[1];

  //TODO

  // Check if the repo already exists

  // Check if the repo is in GitHub

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
    const repos = await Repo.find({repoURL: repoURL});

    // check if repo exist
    if(repos.length == 0) {
      return res.status(404).json({ message: "No such a repositry has been found!" });
    }

    // Add the member to repos members list
    const repo = repos[0];
    const repoId = repo._id.valueOf();
    repo.members.push(newMemberId);
    
    // find user and add the repo to his joined repos
    const user = await User.findById(newMemberId);
    user.joined_repos.push(repoId);

    // update the moruqs
    await User.findByIdAndUpdate(newMemberId, user, {new: true});
    await Repo.findByIdAndUpdate(repoId, repo, {new: true});

    res.status(201).json(repo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  //TODO

  // Join with password

  // Create connection request


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