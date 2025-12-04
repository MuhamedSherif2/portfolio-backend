import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    message: { type: String, required: true },
    isShow: { type: Boolean, default: false }
});

export default mongoose.model('Testimonial', testimonialSchema)
