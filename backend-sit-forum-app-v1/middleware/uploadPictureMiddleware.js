import multer from "multer";
import path from "path";

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the upload destination folder
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename based on the current date and original filename
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);
    },
});

// Configure multer for file upload
const uploadPicture = multer({
    storage: storage,
    limits: {
        // Limit file size to 1MB
        fileSize: 1 * 1000000  // 1MB in bytes
    },
    fileFilter: function (req, file, cb) {
        // Check file extension to allow only specific image formats
        let ext = path.extname(file.originalname);

        // Check if the file extension is allowed
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error("Only Images (.jpg, .png, and .jpeg) are allowed"));
        }

        // File is allowed, continue with the upload
        cb(null, true);
    }
});

export { uploadPicture };
