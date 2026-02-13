const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { isAuth } = require("../../middlewares/isAuth");
const isOwnerOrAdmin = require("../../middlewares/isOwnerOrAdmin");
const { getPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/post");

router.get("/", isAuth, getPosts);
router.get("/:id", isAuth, getPostById);
router.post("/", isAuth, createPost);
router.put("/:id", isAuth, isOwnerOrAdmin(Post), updatePost );
router.delete("/:id", isAuth, isOwnerOrAdmin(Post), deletePost);

module.exports = router;