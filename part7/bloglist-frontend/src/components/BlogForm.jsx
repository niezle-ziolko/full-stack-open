import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onAddBlog }) => {
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl });
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="blog-title" className="form-label">Title</label>
        <input
          id="blog-title"
          className="form-control"
          type="text"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="blog-author" className="form-label">Author</label>
        <input
          id="blog-author"
          className="form-control"
          type="text"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="blog-url" className="form-label">URL</label>
        <input
          id="blog-url"
          className="form-control"
          type="url"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;