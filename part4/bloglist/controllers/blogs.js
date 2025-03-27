const express = require('express');

const Blog = require('../models/blog');
const User = require('../models/user');
const { authenticateToken } = require('../utils/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.find()
  .populate('user', '_id username name')
  .then(blogs => {
    res.json(blogs);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Server error');
  });
  
  res.json(blogs);
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Validate required fields
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' });
  };

  const users = await User.find({});
  const user = users[0];

  // Create the blog object
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user
  });

  try {
    const savedBlog = await blog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the blog' });
  };
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    };

    res.status(204).end(); // No content
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while deleting the blog' });
  };
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    };

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while updating the blog' });
  };
});

module.exports = router;