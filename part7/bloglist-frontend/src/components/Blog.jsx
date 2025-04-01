import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleDetails = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-summary">
        <span className="blog-title">{blog.title}</span> 
        <span className="blog-author">{blog.author}</span>
        <button className="toggle-button" onClick={toggleDetails}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <p className="blog-url">URL: {blog.url}</p>
          <p className="blog-likes">
            Likes: <span className="likes-count">{blog.likes}</span>
            <button className="like-button" onClick={() => onLike(blog)}>like</button>
          </p>
          <p className="blog-user">Added by: {blog.user.name}</p>
          {user && user.username === blog.user.username && (
            <button className="delete-button" onClick={() => onDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};

export default Blog;