import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  id: { type: String },
  userId: { type: String, required: true },
  expertId: { type: String, required: true },
  repoId: { type: String, required: true },
  createdAt: { type: Date, default: null },
});

export default mongoose.model("Contact", contactSchema);
