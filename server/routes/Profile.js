const express = require("express");
const { getProfile } = require("../controllers/Profile");
const router = express.Router();

router.post("/getProfiles",getProfile);

module.exports = router;
