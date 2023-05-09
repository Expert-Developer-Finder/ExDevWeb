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
   branch: {type: String, required: true},
   status: {type:String, default: "creating"},
   hasSlack: {type: String, required: true},
   slackURL: {type: String, default: ""},
   weightCommit: {type:Number, default: 1},
   weightPR: {type:Number, default: 1},
   weightRecency: {type:Number, default: 0.5},
   devNo: {type:Number, default: 3},
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
   id: {type: String},
});

export default mongoose.model("Repo", repoSchema); 



