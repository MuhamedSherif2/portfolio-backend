import Testimonials from '../models/testimonials.model.js';

// ------------------- Add Testimonial -------------------
export const addTestimonial = async (req, res) => {
    try {
        const { authorName, authorEmail, message, isShow } = req.body;

        if (!authorName || !authorEmail || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTestimonial = await Testimonials.create({
            authorName,
            authorEmail,
            message,
            isShow: isShow ?? false // default false
        });

        res.status(201).json({
            message: "Testimonial added successfully",
            data: newTestimonial
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding testimonial", data: error.message });
    }
};

// ------------------- Get All Testimonials -------------------
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Get all testimonials successfully",
            data: testimonials
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching testimonials", data: error.message });
    }
};

// ------------------- Get Show Testimonials -------------------
export const getShowTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.find({ isShow: true }).sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Get show testimonials successfully",
            data: testimonials
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching show testimonials", data: error.message });
    }
};

// ------------------- Update Testimonial -------------------
export const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonials.findById(id);
        if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

        testimonial.authorName = req.body.authorName ?? testimonial.authorName;
        testimonial.authorEmail = req.body.authorEmail ?? testimonial.authorEmail;
        testimonial.message = req.body.message ?? testimonial.message;
        if (req.body.isShow !== undefined) testimonial.isShow = req.body.isShow;

        const updatedTestimonial = await testimonial.save();

        res.status(200).json({
            message: "Testimonial updated successfully",
            data: updatedTestimonial
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating testimonial", data: error.message });
    }
};

// ------------------- Delete Testimonial -------------------
export const deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonials.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Testimonial not found" });

        res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting testimonial", data: error.message });
    }
};
