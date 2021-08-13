var express = require("express");
var router = express.Router();
var multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/audio");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${req.body.name}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/upload", upload.single("file"), async function (req, res, next) {
  console.log(req.file);
  res.send("file uploaded");
});

module.exports = router;
