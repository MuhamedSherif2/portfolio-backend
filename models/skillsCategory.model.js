import mongoose from 'mongoose'

const skillsCategorySchema = mongoose.Schema({
    title: { type: String, required: true },
})

export default mongoose.model("SkillsCategory", skillsCategorySchema);