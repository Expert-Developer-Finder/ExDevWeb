import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   name : {type: String, required: true},
   email: {type: String, required: true},
   password : {type: String, required: true},
   bio: {type: String},
   id: {type: String},
   githubUsername: {type: String},
   githubPAT: {type: String},
   avatarUrl: {type: String},
   joined_repos: { type: [String],default: []},
   join_requests: {type: [{
      userId : {type: String, required: true},
      userName : {type: String, required: true},
      repoId : {type: String, required: true},
      repoName : {type: String, required: true},
      ownerName : {type: String, required: true},
      repoURL : {type: String, required: true},
      status : {type: String, default: "pending"},
      createdAt: {type: Date, default: new Date()},
      updatedAt: {type: Date, default: null},
   }] , default: []},
   owned_repos: { type: [String],default: []},
});

export default mongoose.model("User", userSchema); 



