const multer = require("multer");
const httpError = require("../utils/httpError"); // Assuming you have http-errors or similar package for creating errors
const httpStatus = require("../utils/httpStatus"); // Assuming you have http-status package for status codes

const createMulter = (folderName) => {
  // Multer disk storage configuration
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderName);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      const fileName = `${file.fieldname}-${Date.now()}.${ext}`;
      cb(null, fileName);
    },
  });

  // File filter configuration
  const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split("/")[0];

    if (imageType === "image") {
      return cb(null, true);
    } else {
      const error = httpError.create(
        "only images are allowed",
        httpStatus.BAD_REQUEST,
        httpStatus.FAIL
      );
      return cb(error, false);
    }
  };

  // Return the multer middleware instance configured with the disk storage and file filter
  return multer({ storage: diskStorage, fileFilter });
};

module.exports = createMulter;
