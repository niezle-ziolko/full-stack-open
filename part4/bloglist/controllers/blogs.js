const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

// Fetch all blogs
router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Add new blog
router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = router