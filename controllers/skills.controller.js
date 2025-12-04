import Skills from '../models/skills.model.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

// ------------------- Add Skill -------------------
export const addSkill = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Skill image is required" });
        }

        const uploaded = await uploadToCloudinary(req.file.buffer, "portfolio/skills");

        const newSkill = await Skills.create({
            title,
            image: uploaded.secure_url,
            category,
        });

        res.status(201).json({ message: "Skill added successfully", data: newSkill });
    } catch (error) {
        res.status(500).json({ message: "Error adding skill", data: error.message });
    }
};

// ------------------- Get All Skills -------------------
export const getSkills = async (req, res) => {
    try {
        const skills = await Skills.find()
            .populate("category", "title")
            .sort({ createdAt: -1 });

        res.status(200).json({ message: "Get all skills successfully", data: skills });
    } catch (error) {
        res.status(500).json({ message: "Error fetching skills", data: error.message });
    }
};

// ------------------- Update Skill -------------------
export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skills.findById(id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });

        skill.title = req.body.title ?? skill.title;
        skill.category = req.body.category ?? skill.category;

        if (req.file) {
            const uploaded = await uploadToCloudinary(req.file.buffer, "portfolio/skills");
            skill.image = uploaded.secure_url;
        }

        const updatedSkill = await skill.save();
        res.status(200).json({ message: "Skill updated successfully", data: updatedSkill });
    } catch (error) {
        res.status(500).json({ message: "Error updating skill", data: error.message });
    }
};

// ------------------- Delete Skill -------------------
export const deleteSkill = async (req, res) => {
    try {
        const deleted = await Skills.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Skill not found" });

        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting skill", data: error.message });
    }
};
