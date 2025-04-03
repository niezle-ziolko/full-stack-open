import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import blogService from '../services/blogs';
import { fetchUser } from '../reducers/usersReducer';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.users.singleUser);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user.posts.length > 0) {
      setLoading(true);
      setError(null);
      const fetchBlogs = async () => {
        try {
          const blogTitles = await Promise.all(
            user.posts.map(postId => blogService.getBlog(postId))
          );
          setBlogs(blogTitles);
        } catch (err) {
          setError('Failed to fetch blog titles');
        } finally {
          setLoading(false);
        }
      };
      fetchBlogs();
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Blogs created:</strong> {user.created}</p>

      <h3>Blogs:</h3>
      {loading && <p>Loading blogs...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}><strong>{blog.title}</strong></Link>
            </li>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserDetails;