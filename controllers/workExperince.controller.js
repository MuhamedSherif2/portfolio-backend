import WorkExperience from '../models/workExperince.model.js';

// ------------------- Add Work Experience -------------------
export const addWorkExperience = async (req, res) => {
    try {
        const { type, title, organization, startDate, endDate, description, certificate } = req.body;

        if (!type || !title || !organization || !startDate || !endDate || !description) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const newExperience = await WorkExperience.create({
            type,
            title,
            organization,
            startDate,
            endDate,
            description,
            certificate: certificate || null
        });

        res.status(201).json({
            message: "Work experience added successfully",
            data: newExperience
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding work experience", data: error.message });
    }
};

// ------------------- Get All Work Experiences -------------------
export const getWorkExperience = async (req, res) => {
    try {
        const experiences = await WorkExperience.find().sort({ startDate: -1 });
        res.status(200).json({
            message: "Get all work experiences successfully",
            data: experiences
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching work experiences", data: error.message });
    }
};

// ------------------- Update Work Experience -------------------
export const updateWorkExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await WorkExperience.findById(id);
        if (!experience) return res.status(404).json({ message: "Work experience not found" });

        const updatedFields = {
            type: req.body.type ?? experience.type,
            title: req.body.title ?? experience.title,
            organization: req.body.organization ?? experience.organization,
            startDate: req.body.startDate ?? experience.startDate,
            endDate: req.body.endDate ?? experience.endDate,
            description: req.body.description ?? experience.description,
            certificate: req.body.certificate ?? experience.certificate
        };

        const updatedExperience = await WorkExperience.findByIdAndUpdate(id, updatedFields, { new: true });

        res.status(200).json({
            message: "Work experience updated successfully",
            data: updatedExperience
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating work experience", data: error.message });
    }
};

// ------------------- Delete Work Experience -------------------
export const deleteWorkExperience = async (req, res) => {
    try {
        const deleted = await WorkExperience.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Work experience not found" });

        res.status(200).json({ message: "Work experience deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting work experience", data: error.message });
    }
};
