const express = require("express");
const { changeProfilePicture } = require("../controllers/Profile");
const router = express.Router();

router.post("/changeProfilePicture",changeProfilePicture);

module.exports = router;
