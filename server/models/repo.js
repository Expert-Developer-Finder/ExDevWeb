import mongoose from "mongoose";

const repoSchema = mongoose.Schema({
   ownerName : {type: String, required: true},
   repoName : {type: String, required: true},
   repoURL : {type: String, required: true},
   createdAt: {type: Date, default: new Date()},
   creator: {type: String, require: true},
   repoOwners: { type: [String],default: []},
   members: { type: [String],default: []},
   sharedPass : {type: String, required: true},
   id: {type: String},
});

export default mongoose.model("Repo", repoSchema); 



