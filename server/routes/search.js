const express = require("express");
const router = express.Router();

const { search } = require("../controllers/Search");

router.post("/search",search);

module.exports = router;


