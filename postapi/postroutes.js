const express = require('express');
const Post = require('./database/Post');

const router = express.Router();

// GET all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new post
router.post('/posts', async (req, res) => {
    const { title, body, userId } = req.body;

    try {
        const newPost = await Post.create({ title, body, userId });
        res.json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update a post
router.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title;
        post.body = body;
        await post.save();

        res.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a post
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.destroy();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
