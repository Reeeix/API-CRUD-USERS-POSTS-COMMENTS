const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { getUsers, createUser, deleteUser, updateUser, login } = require("../controllers/user");
const { isAuth } = require("../../middlewares/isAuth");
const onlyAdmin = require("../../middlewares/onlyAdmin")
const isOwnerOrAdmin = require("../../middlewares/isOwnerOrAdmin");

router.get("/", isAuth, getUsers);
router.post("/register", createUser);
router.delete("/:id", isAuth, isOwnerOrAdmin(User), deleteUser);
router.put("/:id", isAuth, onlyAdmin, updateUser );
router.post("/login", login);

module.exports = router;