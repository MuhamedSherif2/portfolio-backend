import sharp from "sharp";

export const optimizeImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const optimizedBuffer = await sharp(req.file.buffer)
      .resize(1000)
      .webp({ quality: 80 })
      .toBuffer();

    req.file.buffer = optimizedBuffer;
    req.file.mimetype = "image/webp";

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image optimization failed" });
  }
};
