import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

import blogService from '../services/blogs';

import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { initializeBlogs, addBlog } from '../reducers/blogReducer';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user');

    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData)); // Set user in Redux store
    }

    blogService
      .getAll()
      .then((fetchedBlogs) => {
        dispatch(initializeBlogs(fetchedBlogs));
      })
      .catch(() => {
        dispatch(setNotification('Error fetching blogs', 'error'));
      });
  }, [dispatch]);

  const handleAddBlog = async (newBlog) => {
    const blogData = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    try {
      const addedBlog = await blogService.addBlog(blogData, user.token);
      dispatch(addBlog(addedBlog));
      dispatch(setNotification('Blog added successfully.', 'success'));
    } catch (error) {
      dispatch(setNotification('Error adding a blog.', 'error'));
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    try {
      const returnedBlog = await blogService.likeBlog(blog._id, updatedBlog, user.token);
      console.log('Returned blog:', returnedBlog);
      dispatch(initializeBlogs(blogs.map((b) => (b._id === returnedBlog._id ? returnedBlog : b))));
      dispatch(setNotification('Blog liked successfully.', 'success'));
    } catch (error) {
      dispatch(setNotification('Error liking the blog.', 'error'));
    }
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog._id, user.token);
        dispatch(initializeBlogs(blogs.filter((b) => b._id !== blog._id)));
        dispatch(setNotification('Blog deleted successfully.', 'success'));
      } catch (error) {
        dispatch(setNotification('Error deleting the blog.', 'error'));
      }
    }
  };

  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>add new blog</h3>
      <Togglable>
        <BlogForm onAddBlog={handleAddBlog} />
      </Togglable>
      {Array.isArray(blogs) &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              onLike={handleLike}
              onDelete={handleDelete}
              user={user}
            />
          ))
      }
    </div>
  );
};

export default BlogsList;