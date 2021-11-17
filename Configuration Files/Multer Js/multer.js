let multer = require("multer"),
  multerStorage = multer.diskStorage({
    destination: "./public/userprofileImage/",
    filename: (req, file, cb) => {
      const fileBreakdown = file.mimetype.split("/");

      if (fileBreakdown[0] === "image") {
        cb(
          null,
          req.session.passport.user.userInfo.login_uuid + "." + fileBreakdown[1]
        );
      } else cb(null, false, { message: req.flash("Wrong File type") });
    },
  }),
  multerStorageAPI = multer.diskStorage({
    destination: "./public/userprofileImage/",
    filename: (req, file, cb) => {
      const fileBreakdown = file.mimetype.split("/");

      if (fileBreakdown[0] === "image") {
        cb(null, "API" + Date.now() + "." + fileBreakdown[1]);
      } else cb(null, false, { message: req.flash("Wrong File type") });
    },
  });

const multerFile_Upload_Function = multer({
  storage: multerStorage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).any();

function checkFileType(file, cb) {
  const types = /jpeg|jpg|png|gif/;
  const fileBreakdown = file.mimetype.split("/");
  const extnames = types.test(fileBreakdown[1].toLowerCase());
  const mimetype = types.test(file.mimetype);

  if (extnames && mimetype) return cb(null, true);
  else cb("Wrong File Type");
}

const multerFile_Upload_ForAPI = multer({
  storage: multerStorageAPI,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).any();

module.exports = { multerFile_Upload_Function, multerFile_Upload_ForAPI };

multer = null;
