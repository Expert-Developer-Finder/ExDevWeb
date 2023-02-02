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
  const { repoURL, newMember } = req.body;
  // const { repoURL, newMember, hasPassword, password } = req.body;
  


  try {
    // find repo and add the member to its members
    const repo = await Repo.find({repoURL: repoURL})
    console.log(repo);
    return;

    // find user and add the repo to his joined repos
    const user = await User.findById(newMember);
    user.owned_repos.push(newRepoId);

    // update the moruqs
    await User.findByIdAndUpdate(newMember, user, {new: true});
    await Repo.findByIdAndUpdate(repo._id, repo, {new: true});
    
    res.status(201).json(repo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  //TODO

  // Check if the repo exists in our DB

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