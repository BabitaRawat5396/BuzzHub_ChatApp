const express = require("express");
const router = express.Router();

const { accessChat ,fetchUserAllChats, createGroupChat, renameGroup, addTogroup, removeFromGroup,deleteChat } = require("../controllers/Chat");
const { auth } = require("../middlewares/Auth");

router.post("/accessChat", auth, accessChat);
router.post("/deleteChat", auth, deleteChat);
router.get("/fetchUserAllChats", auth, fetchUserAllChats);
router.post("/createGroupChat", auth, createGroupChat);
router.put("/renameGroup", auth, renameGroup);
router.put("/addTogroup", auth, addTogroup);
router.put("/removeFromGroup", auth, removeFromGroup);


module.exports = router;