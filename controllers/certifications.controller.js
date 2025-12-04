import Certifications from "../models/certifications.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const addCertification = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Certification image is required" });
        }

        const uploadedImage = await uploadToCloudinary(
            req.file.buffer,
            "portfolio/certifications"
        );

        const newCert = await Certifications.create({
            certificateTitle: req.body.certificateTitle,
            platform: req.body.platform,
            year: req.body.year,
            certificateImage: uploadedImage.secure_url
        });

        res.status(200).json({
            message: "Certification added successfully",
            data: newCert,
        });
    } catch (error) {
        res.status(500).json({ message: "Error Add Certification", data: error.message });
    }
};

export const getCertification = async (req, res) => {
    try {
        const certs = await Certifications.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Get Certifications successfully",
            data: certs,
        });
    } catch (error) {
        res.status(500).json({ message: "Error Get Certification", data: error.message });
    }
};

export const updateCertification = async (req, res) => {
    try {
        const { id } = req.params;

        const cert = await Certifications.findById(id);
        if (!cert) return res.status(404).json({ message: "Certification not found" });

        let imageUrl = cert.certificateImage;

        if (req.file) {
            const uploadedImage = await uploadToCloudinary(
                req.file.buffer,
                "portfolio/certifications"
            );
            imageUrl = uploadedImage.secure_url;
        }

        const updatedCert = await Certifications.findByIdAndUpdate(
            id,
            {
                certificateTitle: req.body.certificateTitle,
                platform: req.body.platform,
                year: req.body.year,
                certificateImage: imageUrl
            },
            { new: true }
        );

        res.status(200).json({
            message: "Certification updated successfully",
            data: updatedCert,
        });
    } catch (error) {
        res.status(500).json({ message: "Error Update Certification", data: error.message });
    }
};

export const daleteCertification = async (req, res) => {
    try {
        const deleted = await Certifications.findByIdAndDelete(req.params.id);

        if (!deleted)
            return res.status(404).json({ message: "Certification not found" });

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error Delete Certification", data: error.message });
    }
};
