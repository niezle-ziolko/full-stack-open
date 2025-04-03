import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

import blogService from '../services/blogs';

import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { initializeBlogs, addNewBlog } from '../reducers/blogReducer';

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.allBlogs);  // Accessing allBlogs from the Redux store
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user');

    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData)); // Set user in Redux store
    }

    dispatch(initializeBlogs()); // Fetch and initialize blogs from the Redux store
  }, [dispatch]);

  const handleAddBlog = async (newBlog) => {
    const blogData = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    if (!user || !user.token) {
      dispatch(setNotification('User not authenticated', 'error'));
      return;
    }

    try {
      dispatch(addNewBlog(blogData)); // Dispatch the action to add a new blog
      dispatch(setNotification('Blog added successfully.', 'success'));
    } catch (error) {
      dispatch(setNotification('Error adding a blog.', 'error'));
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
            />
          ))
      }
    </div>
  );
};

export default BlogsList;