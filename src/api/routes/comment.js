const express = require("express");
const router = express.Router();
const { isAuth } = require("../../middlewares/isAuth");
const Comment = require("../models/comment");


const isOwnerOrAdmin = require("../../middlewares/isOwnerOrAdmin");
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require("../controllers/comment");

router.get("/", isAuth, getComments);
router.get("/:id", isAuth, getCommentById);
router.post("/", isAuth, createComment);
router.put("/:id", isAuth, isOwnerOrAdmin(Comment), updateComment);
router.delete("/:id", isAuth, isOwnerOrAdmin(Comment), deleteComment);

module.exports = router;