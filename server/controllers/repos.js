import Repo from "../models/repo.js";

export const createRepo = async (req, res) => {
    const {repoURL, creator} = req.body;
    const raw =  repoURL.substr(19).split("/");
    const ownerName = raw[0]; 
    const repoName = raw[1];

    //TODO 
    
    // Check if the repo already exists

    // Check if the repo is in GitHub

    // Add member (creator)

    // Make Repo Owner (creator)

    const newRepo = new Repo({ creator, ownerName, repoName,repoURL, createdAt: new Date().toISOString()});
    try {
        await newRepo.save();
        res.status(201).json(newRepo);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}
