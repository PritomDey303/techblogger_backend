// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

async function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // File upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

  // define the memory storage instead of diskstorage
  const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_FOLDER);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        console.log(error_msg);
        cb(createError(error_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
