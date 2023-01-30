import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   name : {type: String, required: true},
   email: {type: String, required: true},
   password : {type: String, required: true},
   bio: {type: String},
   id: {type: String},
   joined_repos: { type: [String],default: []},
   owned_repos: { type: [String],default: []},
});

export default mongoose.model("User", userSchema); 



