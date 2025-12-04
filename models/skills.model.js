import mongoose from 'mongoose'

const skillsSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkillsCategory",
        required: true
    }
})

export default mongoose.model('Skills', skillsSchema)