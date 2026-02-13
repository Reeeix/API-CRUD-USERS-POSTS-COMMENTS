const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
    text: { type: String, required:true },
    author: { type: mongoose.Schema.Types.ObjectId, ref:'users', required:true },
    },
    { timestamps: true }
);

const Post = mongoose.model('posts', postSchema, 'posts');
module.exports = Post;
