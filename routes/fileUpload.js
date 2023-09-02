const express = require("express");
const router = express.Router();

//import controller
const { imageUpload, videoUpload } = require("../Controller/Fileupload");
const { fetchData } = require("../Controller/getData");

//define routes
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.get("/getallUsers", fetchData);
module.exports = router;
