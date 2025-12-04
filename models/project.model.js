import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectCategory",
    required: true
  },
  image: { type: String, required: true },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
      required: true
    }
  ],
  hot: {
    type: Boolean,
    default: false
  },
  githubFront: { type: String },
  githubBack: { type: String },
  demo: { type: String },
},
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
