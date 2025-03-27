import React, { useState } from 'react';

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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => onLike(blog)}>like</button></p>
          <p>Added by: {blog.user.name}</p>
          {user && user.username === blog.user.username && ( // Show delete button only if the user is the author
            <button onClick={() => onDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;