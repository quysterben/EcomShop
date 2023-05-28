const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadController = {
    uploadImages: async (req, res, next) => {
        try {
            if (!req.files) {
                const err = new Error('No image providd.');
                err.statusCode = 500;
                throw err;
            }

            const imageSaveds = req.files.map((file) =>
                cloudinary.v2.uploader.upload(file.path, { folder: 'res/images' }),
            );
            const imageURLs = await Promise.all(imageSaveds);

            req.files.forEach((file) => clearImage(file.path));

            return res.json({
                message: 'Upload image successfully.',
                success: true,
                imageURLs: imageURLs,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    destroyImages: async (req, res, next) => {
        const { imageUrl } = req.body;

        try {
            if (!imageUrl) {
                const err = new Error('No image selected.');
                err.statusCode = 500;
                throw err;
            }

            const imageRemoved = await cloudinary.v2.uploader.destroy(imageUrl);

            res.status(202).json({
                message: 'Delete images successfully.',
                success: true,
                data: imageRemoved,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname, '..', '..', filePath);
    fs.unlink(filePath, (err) => {
        if (err) console.log(err);
    });
};

module.exports = uploadController;
