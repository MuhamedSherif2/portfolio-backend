import Cover from '../models/cover.model.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export const addCover = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required" });
        }

        const uploadImage = await uploadToCloudinary(
            req.file.buffer,
            "portfolio/cover"
        );

        const createCover = await Cover.create({
            name: req.body.name,
            title: req.body.title,
            shortTagline: req.body.shortTagline,
            callToAction: req.body.callToAction,
            photo: uploadImage.secure_url,
        });

        res.status(200).json({
            message: "Created Cover Successfully",
            data: createCover,
        });
    } catch (error) {
        res.status(500).json({ message: "Error Add Cover", data: error.message });
    }
};

export const getCover = async (req, res) => {
    try {
        const cover = await Cover.find();

        res.status(200).json({
            message: "Get Cover Successful",
            data: cover,
        });
    } catch (error) {
        res.status(500).json({ message: "Error Get Cover", data: error.message });
    }
};

export const updateCover = async (req, res) => {
    try {
        const { id } = req.params;

        const cover = await Cover.findById(id);
        if (!cover) return res.status(404).json({ message: "Cover not found" });

        let imageUrl = cover.photo; // FIXED

        if (req.file) {
            const uploadedImage = await uploadToCloudinary(
                req.file.buffer,
                "portfolio/cover"
            );
            imageUrl = uploadedImage.secure_url;
        }

        const updatedCover = await Cover.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                title: req.body.title,
                shortTagline: req.body.shortTagline,
                callToAction: req.body.callToAction,
                photo: imageUrl,
            },
            { new: true }
        );

        res.status(200).json({
            message: "Cover updated successfully",
            data: updatedCover,
        });
    } catch (error) {
        res.status(500).json({ message: "Error Update Cover", data: error.message });
    }
};

export const deleteCover = async (req, res) => {
    try {
        const deleted = await Cover.findByIdAndDelete(req.params.id);

        if (!deleted)
            return res.status(404).json({ message: "Cover not found" });

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error Delete Cover", data: error.message });
    }
};
