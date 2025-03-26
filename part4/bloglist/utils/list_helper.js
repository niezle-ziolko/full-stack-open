const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max))
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const counts = _.countBy(blogs, 'author');
  const topAuthor = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  return { author: topAuthor, blogs: counts[topAuthor] }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {});

  const topAuthor = Object.keys(likesByAuthor).reduce((a, b) =>
    likesByAuthor[a] > likesByAuthor[b] ? a : b
  );

  return { author: topAuthor, likes: likesByAuthor[topAuthor] }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};