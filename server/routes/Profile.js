const express = require("express");
const { getProfile } = require("../controllers/profile");
const router = express.Router();

router.post("/getProfiles",getProfile);

module.exports = router;
