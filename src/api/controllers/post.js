const Post = require("../models/post");

const createPost = async (req, res, next) => {
    try {
        const post = new Post({
            ...req.body,
            author: req.user._id
        });

        await post.save();

        return res.status(201).json(post);
    } catch (error) {
        return res.status(400).json("error")
    } 

}

const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "email role");

        if (!post) {
            return res.status(404).json("Post no encontrado")
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json("error");
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate("author", "email role");

        if (posts.length === 0) {
           return res.status(200).json([])
        }
        
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json("Error del servidor");
    }
}

const updatePost = async (req, res, next) => {
    try {
        const updateData = { ...req.body };
        delete updateData.author;

        const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!post) {
           return res.status(400).json("post no encontrado")
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json("error")
    }
};

const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(400).json("Post no encontrado");
        }

        return res.status(200).json(deletedPost);
    } catch (error) {
        return res.status(400).json("error")
    }
}

module.exports = {createPost, getPosts, getPostById, updatePost, deletePost}