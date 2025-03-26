const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
});

blogSchema.methods.toJSON = function() {
  const blogObject = this.toObject();
  blogObject.id = blogObject._id.toString();
  delete blogObject._id;

  return blogObject;
};

module.exports = mongoose.model('Blog', blogSchema);