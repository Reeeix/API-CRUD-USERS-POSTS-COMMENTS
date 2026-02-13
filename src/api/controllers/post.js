const Post = require("../models/post");

const createPost = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json("error")
    } 

}

const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post no encontrado")
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json("error");
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        if (posts.length === 0) {
           return res.status(400).json("No hay posts disponibles")
        }
        
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json("Error del servidor");
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
           return res.status(400).json("post no encontrado")
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json("error")
    }
};

const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(400).json("Post no encontrado");
        }
        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(400).json("error")
    }
}

module.exports = {createPost, getPosts, getPostById, updatePost, deletePost}