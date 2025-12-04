import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  certificateTitle: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  certificateImage: {
    type: String,
    required: true
  }
});

export default mongoose.model("Certification", certificationSchema);
