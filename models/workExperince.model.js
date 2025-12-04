import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["work", "internship", "volunteering", "training", "freelance", "project", "activity"],
        required: true,
    },
    title: { type: String, required: true, },
    organization: { type: String, required: true, },
    startDate: { type: String, required: true, },
    endDate: { type: String, required: true, },
    description: { type: String, required: true, },
    certificate: { type: String },
});


export default mongoose.model('WorkExperience', experienceSchema)
