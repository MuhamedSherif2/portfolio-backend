import Service from '../models/services.model.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

// ------------------- Add Service -------------------
export const addServices = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        let iconUrl = "";
        if (req.file) {
            const uploaded = await uploadToCloudinary(req.file.buffer, "portfolio/services");
            iconUrl = uploaded.secure_url;
        }

        const newService = await Service.create({
            title,
            description,
            icon: iconUrl,
        });

        res.status(201).json({ message: "Service added successfully", data: newService });
    } catch (error) {
        res.status(500).json({ message: "Error adding service", data: error.message });
    }
};

// ------------------- Get All Services -------------------
export const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Get all services successfully", data: services });
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", data: error.message });
    }
};

// ------------------- Update Service -------------------
export const updateServices = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        service.title = req.body.title ?? service.title;
        service.description = req.body.description ?? service.description;

        if (req.file) {
            const uploaded = await uploadToCloudinary(req.file.buffer, "portfolio/services");
            service.icon = uploaded.secure_url;
        }

        const updatedService = await service.save();
        res.status(200).json({ message: "Service updated successfully", data: updatedService });
    } catch (error) {
        res.status(500).json({ message: "Error updating service", data: error.message });
    }
};

// ------------------- Delete Service -------------------
export const deleteServices = async (req, res) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Service not found" });

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service", data: error.message });
    }
};
