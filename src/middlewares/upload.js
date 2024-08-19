
// upload.js - Common file upload middleware
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");
const path = require("path");

const tempFileLocation = path.join(process.env.FILE_LOCATION, process.env.TEMP_FILE_LOCATION);

if (!fs.existsSync(tempFileLocation)) {
    fs.mkdirSync(tempFileLocation, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__basedir, tempFileLocation);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).any();

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

