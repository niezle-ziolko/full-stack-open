import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";

import blogService from "../services/blogs";
import { fetchUser } from "../reducers/usersReducer";

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
          setError("Failed to fetch blog titles");
        } finally {
          setLoading(false);
        };
      };
      fetchBlogs();
    };
  }, [dispatch, user]);

  if (!user || loading) {
    return <Loading />;
  };

  return (
    <div className="container py-4 d-flex gap-4">
      <div className="w-100">
        <h4>User Details</h4>
        <p><span className="text-muted mb-0">Name:</span> {user.name}</p>
        <p><span className="text-muted mb-0">Username:</span> {user.username}</p>
        <p><span className="text-muted mb-0">Blogs created:</span> {user.created}</p>
      </div>

      <div className="w-100">
        <h4 className="mb-3">Blogs:</h4>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
        <ul className="d-flex flex-column gap-3 ps-0 mb-0">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <li className="d-block" key={blog._id}>
                <div className="blog card border p-2">
                  <div className="card-body p-2">
                    <Link to={`/blogs/${blog._id}`} className="text-decoration-none text-primary">
                      <h5 className="card-title mb-0">{blog.title}</h5>
                    </Link>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;