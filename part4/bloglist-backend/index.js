require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Blog = require('./models/blog');
const User = require('./models/user');

const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const { authenticateToken } = require('./utils/auth');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ama5n.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

app.post('/api/blogs', authenticateToken, async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Validate required fields
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' });
  }

  const users = await User.find({});
  const user = users[0];

  // Create the blog object
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();
    
    return res.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the blog' });
  };
});

app.use('/api/users', authenticateToken, usersRouter);

app.use('/api/login', loginRouter);

module.exports = app;