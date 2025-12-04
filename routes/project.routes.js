import express from "express";
import upload from "../middlewars/upload.middleware.js";
import { optimizeImage } from "../middlewars/optimizeImage.middleware.js";
import {
    createProject,
    getProjects,
    deleteProject,
    updateProject,
    getHotProjects
} from "../controllers/project.controller.js";
import { protect } from '../middlewars/auth.middleware.js'

const router = express.Router();

router.get("/", getProjects);

router.get("/hot", getHotProjects);

router.post("/add", protect, upload.single("image"), optimizeImage, createProject);

router.put("/update/:id", protect, upload.single("image"), optimizeImage, updateProject);

router.delete("/delete/:id", protect, deleteProject);

export default router;
