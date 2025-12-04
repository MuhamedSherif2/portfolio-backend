import AboutMe from '../models/aboutMe.model.js'

export const addAboutMe = async (req, res) => {
    try {
        const exists = await AboutMe.findOne();
        if (exists) {
            return res.status(400).json({ message: "About Me already exists. Use update instead." });
        }

        const about = await AboutMe.create({
            experience: req.body.experience,
            uniquePoint: req.body.uniquePoint,
            careerGoals: req.body.careerGoals,
        });

        res.status(201).json({
            message: "About Me added successfully",
            data: about
        });

    } catch (error) {
        res.status(500).json({ message: "Error Add About-me", data: error });
    }
};

export const getAboutMe = async (req, res) => {
    try {
        const about = await AboutMe.findOne();

        res.status(200).json({
            message: "Get About Me successfully",
            data: about
        });

    } catch (error) {
        res.status(500).json({ message: "Error Get About-me", data: error });
    }
};

export const updateAboutMe = async (req, res) => {
    try {
        const about = await AboutMe.findOne();

        if (!about) {
            return res.status(404).json({ message: "About Me not found" });
        }

        const updated = await AboutMe.findByIdAndUpdate(
            about._id,
            {
                experience: req.body.experience,
                uniquePoint: req.body.uniquePoint,
                careerGoals: req.body.careerGoals,
            },
            { new: true }
        );

        res.status(200).json({
            message: "About Me updated successfully",
            data: updated
        });

    } catch (error) {
        res.status(500).json({ message: "Error Update About-me", data: error });
    }
};

export const daleteAboutMe = async (req, res) => {
    try {
        await AboutMe.deleteMany();

        res.status(200).json({
            message: "About Me deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Error Delete About-me", data: error });
    }
};
