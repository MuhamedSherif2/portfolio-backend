import mongoose from 'mongoose'

const coverSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    shortTagline: { type: String, required: true },
    photo: { type: String, required: true },
    callToAction: { type: String, required: true }
})

export default mongoose.model("Cover", coverSchema);