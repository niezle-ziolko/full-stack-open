import React, { useState } from 'react';

const BlogForm = ({ onAddBlog }) => {
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl });
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;