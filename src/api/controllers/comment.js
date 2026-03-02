const Comment = require("../models/comment");
const Post = require("../models/post");

const createComment = async (req, res, next) => {
    try {
        if (!req.body.post) {
            return res.status(400).json("El post es obligatorio");
        }

        const post = await Post.findById(req.body.post);
        if (!post) {
            return res.status(404).json("Post no encontrado");
        }

        const comment = new Comment({
            ...req.body,
            author: req.user._id
        });

        await comment.save();

        return res.status(201).json(comment);
    } catch (error) {
        return res.status(400).json("error")
    } 

}

const getCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id).populate("author", "email role");

        if (!comment) {
            return res.status(404).json("Comentario no encontrado")
        }

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json("error");
    }
}

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().populate("author", "email role");

        if (comments.length === 0) {
            return res.status(200).json([])
        }

        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json("Error del servidor");

    }
}

const updateComment = async (req, res, next) => {
    try {
        const updateData = { ...req.body };
        delete updateData.author;

        const comment = await Comment.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!comment) {
           return res.status(400).json("Comentario no encontrado")
        }

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json("error")
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(400).json("Comentario no encontrado");
        }

        return res.status(200).json(deletedComment);
    } catch (error) {
        return res.status(400).json("error")
    }
}

module.exports = {createComment, getComments, getCommentById, updateComment, deleteComment}