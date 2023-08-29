const express = require("express");
const router = express.Router();

const { addMessage, getAllMessages } = require("../controllers/Message");
const { auth } = require("../middlewares/Auth");

router.post("/addMessage", auth,addMessage);
router.post("/getAllMessages",getAllMessages);


module.exports = router;


