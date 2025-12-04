import mongoose from 'mongoose';

const aboutMeSchema = new mongoose.Schema({
    experience: { type: String, required: true },
    uniquePoint: { type: String, required: true },
    careerGoals: { type: String, required: true }
});

export default mongoose.model('AboutMe', aboutMeSchema);
