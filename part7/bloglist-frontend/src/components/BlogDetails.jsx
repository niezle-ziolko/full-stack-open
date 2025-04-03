import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import blogService from '../services/blogs';
import { fetchBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const blog = useSelector((state) => state.blogs.singleBlog);
  const [likes, setLikes] = useState(blog ? blog.likes : 0);

  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes);
    }
  }, [blog]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    };
  
    try {
      const returnedBlog = await blogService.likeBlog(blog._id, updatedBlog, user.token);
      setLikes(returnedBlog.likes);
      dispatch(setNotification('Blog liked successfully.', 'success'));
    } catch (error) {
      dispatch(setNotification('Error liking the blog.', 'error'));
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog._id, user.token);
        dispatch(setNotification('Blog deleted successfully.', 'success'));
        navigate('/');
      } catch (error) {
        dispatch(setNotification('Error deleting the blog.', 'error'));
      }
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: <span>{likes}</span>
        <button onClick={handleLike}>
          like
        </button>
      </p>
      <p>Added by: 
        <Link to={`/users/${blog.user._id}`}>{blog.user.name}</Link>
      </p>
      <button className="delete-button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default BlogDetails;