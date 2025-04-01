import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user');
    
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    };

    blogService
      .getAll()
      .then(fetchedBlogs => setBlogs(fetchedBlogs))
      .catch(() => {
        setNotification({ message: 'Error fetching blogs', type: 'error' });
        setTimeout(() => setNotification(null), 5000);
      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login(username, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setNotification({ message: 'Logged in successfully.', type: 'success' });
    } catch (error) {
      setNotification({ message: error.message, type: 'error' });
    };

    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setNotification({ message: 'Logout successfully.', type: 'success' });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddBlog = async (newBlog) => {
    const blogData = { title: newBlog.title, author: newBlog.author, url: newBlog.url };

    try {
      const addedBlog = await blogService.addBlog(blogData, user.token);
      setBlogs(blogs.concat(addedBlog));
      setNotification({ message: 'Blog added successfully.', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error adding a blog.', type: 'error' });
    };

    setTimeout(() => setNotification(null), 5000);
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1 // Increment the likes
    };

    try {
      const returnedBlog = await blogService.likeBlog(blog._id, updatedBlog, user.token);
      setBlogs(blogs.map(b => (b._id === returnedBlog._id ? returnedBlog : b)));
      setNotification({ message: 'Blog liked successfully.', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error liking the blog.', type: 'error' });
    };

    setTimeout(() => setNotification(null), 5000);
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog._id, user.token);
        setBlogs(blogs.filter(b => b._id !== blog._id));
        setNotification({ message: 'Blog deleted successfully.', type: 'success' });
      } catch (error) {
        setNotification({ message: 'Error deleting the blog.', type: 'error' });
      }

      setTimeout(() => setNotification(null), 5000);
    };
  };

  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {user === null ? (
        <div>
          <h2>Log in to the application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.username} is logged</p>
          <button onClick={handleLogout}>logout</button>
          <h3>add new blog</h3>
          <Togglable>
            <BlogForm onAddBlog={handleAddBlog} />
          </Togglable>
          {Array.isArray(blogs) && blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog key={blog._id} blog={blog} onLike={handleLike} onDelete={handleDelete} user={user} />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default App;