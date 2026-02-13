const Comment = require("../models/comment");

const createComment = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json("error")
    } 

}

const getCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json("Comentario no encontrado")
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json("error");
    }
}

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find();
        if (comments.length === 0) {
            return res.status(400).json("No hay comentarios disponibles")
        }
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json("Error del servidor");

    }
}

const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
           return res.status(400).json("Comentario no encontrado")
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json("error")
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(400).json("Comentario no encontrado");
        }
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(400).json("error")
    }
}

module.exports = {createComment, getComments, getCommentById, updateComment, deleteComment}