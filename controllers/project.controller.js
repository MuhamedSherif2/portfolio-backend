import Project from "../models/project.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// ------------------- Create Project -------------------
export const createProject = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Project image is required" });

        let skillsArray = [];
        if (req.body.skills) {
            try {
                skillsArray = JSON.parse(req.body.skills);
            } catch {
                return res.status(400).json({ message: "Invalid skills format" });
            }
        }

        const uploadedImage = await uploadToCloudinary(req.file.buffer, "portfolio/projects");

        const newProject = await Project.create({
            title: req.body.title,
            overview: req.body.overview,
            keyFeatures: req.body.keyFeatures, 
            highlights: req.body.highlights, 
            projectType: req.body.projectType,
            category: req.body.category,
            skills: skillsArray,
            hot: req.body.hot ?? false,
            githubFront: req.body.githubFront,
            githubBack: req.body.githubBack,
            demo: req.body.demo,
            image: uploadedImage.secure_url,
        });

        res.status(201).json({ message: "Project created successfully", data: newProject });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ------------------- Get All Projects -------------------
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("category", "title")
            .populate("skills", "title image")
            .sort({ createdAt: -1 });

        res.status(200).json({ message: "Get all projects successfully", data: projects });
    } catch (err) {
        res.status(500).json({ message: "Error fetching projects", data: err.message });
    }
};

// ------------------- Get Hot Projects -------------------
export const getHotProjects = async (req, res) => {
    try {
        const projects = await Project.find({ hot: true })
            .populate("category", "title")
            .populate("skills", "title image")
            .sort({ createdAt: -1 });

        res.status(200).json({ message: "Get hot projects successfully", data: projects });
    } catch (err) {
        res.status(500).json({ message: "Error fetching hot projects", data: err.message });
    }
};

// ------------------- Update Project -------------------
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        let skillsArray = project.skills;
        if (req.body.skills) {
            try {
                skillsArray = JSON.parse(req.body.skills);
            } catch {
                return res.status(400).json({ message: "Invalid skills format" });
            }
        }

        let imageUrl = project.image;
        if (req.file) {
            const uploadedImage = await uploadToCloudinary(req.file.buffer, "portfolio/projects");
            imageUrl = uploadedImage.secure_url;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                overview: req.body.overview || project.overview, // ⬅️ تغيير
                keyFeatures: req.body.keyFeatures || project.keyFeatures, // ⬅️ إضافة
                highlights: req.body.highlights || project.highlights, // ⬅️ إضافة
                projectType: req.body.projectType || project.projectType,
                category: req.body.category || project.category,
                skills: skillsArray,
                hot: req.body.hot ?? project.hot,
                githubFront: req.body.githubFront || project.githubFront,
                githubBack: req.body.githubBack || project.githubBack,
                demo: req.body.demo || project.demo,
                image: imageUrl,
            },
            { new: true }
        );

        res.status(200).json({ message: "Project updated successfully", data: updatedProject });
    } catch (err) {
        res.status(500).json({ message: "Server error", data: err.message });
    }
};

// ------------------- Delete Project -------------------
export const deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Project not found" });

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting project", data: err.message });
    }
};