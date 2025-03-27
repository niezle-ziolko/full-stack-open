import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    };

    const fetchBlogs = async () => {
      const response = await fetch('https://3003-niezleziolk-fullstackop-7urkoi2nkbm.ws-eu118.gitpod.io/api/blogs');
      const data = await response.json();

      setBlogs(Array.isArray(data) ? data : []);
    };

    fetchBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://3003-niezleziolk-fullstackop-7urkoi2nkbm.ws-eu118.gitpod.io/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ username, token: data.token });
        localStorage.setItem('user', JSON.stringify({ username, token: data.token }));
        setNotification({ message: 'Logged in successfully.', type: 'success' });
      } else {
        setNotification({ message: 'Login error.', type: 'error' });
      };
    } catch (error) {
      setNotification({ message: 'Server error.', type: 'error' });
    };
    
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setNotification({ message: 'Logout succesfully.', type: 'success' });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddBlog = async (newBlog) => {
    const blogData = { title: newBlog.title, author: newBlog.author, url: newBlog.url };
  
    try {
      const response = await fetch('https://3003-niezleziolk-fullstackop-7urkoi2nkbm.ws-eu118.gitpod.io/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(blogData),
      });
  
      if (response.ok) {
        const addedBlog = await response.json();
        setBlogs(blogs.concat(addedBlog));
        setNotification({ message: 'Blog added successfully.', type: 'success' });
      } else {
        setNotification({ message: 'Error adding a blog.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Server error', type: 'error' });
    };
  
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1 // Increment the likes
    };
  
    try {
      const response = await fetch(`https://3003-niezleziolk-fullstackop-7urkoi2nkbm.ws-eu118.gitpod.io/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user: blog.user._id, // Send the user ID
          likes: updatedBlog.likes,
          author: blog.author,
          title: blog.title,
          url: blog.url,
        }),
      });
  
      if (response.ok) {
        const returnedBlog = await response.json();
        setBlogs(blogs.map(b => (b._id === returnedBlog._id ? returnedBlog : b))); // Update the state with the new blog data
        setNotification({ message: 'Blog liked successfully.', type: 'success' });
      } else {
        setNotification({ message: 'Error liking the blog.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Server error', type: 'error' });
    };
  
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);
  
    if (confirmDelete) {
      try {
        const response = await fetch(`https://3003-niezleziolk-fullstackop-7urkoi2nkbm.ws-eu118.gitpod.io/api/blogs/${blog._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
        if (response.ok) {
          setBlogs(blogs.filter(b => b._id !== blog._id)); // Remove the deleted blog from the state
          setNotification({ message: 'Blog deleted successfully.', type: 'success' });
        } else {
          setNotification({ message: 'Error deleting the blog.', type: 'error' });
        }
      } catch (error) {
        setNotification({ message: 'Server error', type: 'error' });
      }
  
      setTimeout(() => setNotification(null), 5000);
    }
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