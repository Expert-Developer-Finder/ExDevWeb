import mongoose from "mongoose";

const querySchema = mongoose.Schema({
  id: { type: String },
  queryOwnerId: { type: String, required: true },
  repoId: { type: String, required: true },
  source: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  userLiked: {type: Boolean, default: false},
  feedbackNumber: {type: Number, required: false},
  feedbackTest: {type: String, required: false},
  returnedUsers: {type: [{
    name : {type: String, required: false},
    email : {type: String, required: false},    
   }] },

});

export default mongoose.model("Query", querySchema);
