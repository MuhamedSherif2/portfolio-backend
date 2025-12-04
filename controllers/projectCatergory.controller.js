import Category from "../models/projectCategory.model.js";

// ------------------- Add Category -------------------
export const addCategory = async (req, res) => {
    try {
        const newCategory = await Category.create({ title: req.body.title });
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding category", error: error.message });
    }
}

// ------------------- Get All Categories -------------------
export const getCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.status(200).json({
            message: "Categories fetched successfully",
            data: allCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
}

// ------------------- Delete Category -------------------
export const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
}
