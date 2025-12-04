import SkillsCategory from '../models/skillsCategory.model.js';

// ------------------- Add Skill Category -------------------
export const addSkillCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const newCategory = await SkillsCategory.create({ title });
        res.status(201).json({ message: "Skill category added successfully", data: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error adding skill category", data: error.message });
    }
};

// ------------------- Get All Skill Categories -------------------
export const getSkillsCategory = async (req, res) => {
    try {
        const categories = await SkillsCategory.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Get all skill categories successfully", data: categories });
    } catch (error) {
        res.status(500).json({ message: "Error fetching skill categories", data: error.message });
    }
};

// ------------------- Update Skill Category -------------------
export const updateSkillCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await SkillsCategory.findById(id);
        if (!category) return res.status(404).json({ message: "Skill category not found" });

        category.title = req.body.title ?? category.title;

        const updatedCategory = await category.save();
        res.status(200).json({ message: "Skill category updated successfully", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error updating skill category", data: error.message });
    }
};

// ------------------- Delete Skill Category -------------------
export const deleteSkillCategory = async (req, res) => {
    try {
        const deleted = await SkillsCategory.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Skill category not found" });

        res.status(200).json({ message: "Skill category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting skill category", data: error.message });
    }
};
