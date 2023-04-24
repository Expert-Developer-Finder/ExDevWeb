import mongoose from "mongoose";

const querySchema = mongoose.Schema({
  id: { type: String },
  queryOwnerId: { type: String, required: true },
  repoId: { type: String, required: true },
  source: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  feedbackGiven: {type: Boolean, default: false},
  feedbackNumber: {type: Number, required: false},
  feedbackText: {type: String, required: false},
  returnedUsers: {type: [{
    userId: {type:String, required: false},
    name : {type: String, required: false},
    email : {type: String, required: false}, 
    liked: {type: Boolean, required: false},
   }] },

});

export default mongoose.model("Query", querySchema);
