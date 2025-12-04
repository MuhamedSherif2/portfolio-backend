import Contact from "../models/contact.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendContactMessage = async (req, res) => {
    try {
        const { name, email, message, phoneNumber } = req.body;

        const savedMessage = await Contact.create({ name, email, message });

        await sendEmail(
            process.env.EMAIL_USER,
        `New Message from ${name}`,
        `
        <h2>New Contact Message</h2>
        <h1><strong>Email:</strong> ${email}</h1>
        <h3>${phoneNumber}</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
        );

        res.status(201).json({
            message: "Message sent successfully!",
            data: savedMessage,
        });

    } catch (error) {
        res.status(500).json({ message: "Error sending message", error });
    }
};
