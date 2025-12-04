import mongoose from 'mongoose'

const projectCategorySchema = mongoose.Schema({
    title: { type: String, required: true },
})

export default mongoose.model("ProjectCategory", projectCategorySchema);