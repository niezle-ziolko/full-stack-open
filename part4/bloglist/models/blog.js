const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  author: String,
  url: String
});

blogSchema.methods.toJSON = function() {
  const blogObject = this.toObject();
  delete blogObject.__v;

  if (blogObject.user) {
    blogObject.user = {
      _id: blogObject.user._id,
      username: blogObject.user.username,
      name: blogObject.user.name
    };
  };

  return blogObject;
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;