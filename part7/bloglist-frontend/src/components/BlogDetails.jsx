import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";

import Loading from "./Loading";
import CommentForm from "./CommentForm";

import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { fetchBlog, addNewComment } from "../reducers/blogReducer";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const blog = useSelector((state) => state.blogs.singleBlog);
  const [likes, setLikes] = useState(blog ? blog.likes : 0);

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes);
    };
  }, [blog]);

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    };
  
    try {
      const returnedBlog = await blogService.likeBlog(blog._id, updatedBlog, user.token);
      setLikes(returnedBlog.likes);
      dispatch(setNotification("Blog liked successfully.", "success"));
    } catch (error) {
      dispatch(setNotification("Error liking the blog.", "error"));
    };
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog._id, user.token);
        dispatch(setNotification("Blog deleted successfully.", "success"));
        navigate("/");
      } catch (error) {
        dispatch(setNotification("Error deleting the blog.", "error"));
      };
    };
  };

  const handleAddComment = async (id, newComment) => {
    const commentData = {
      content: newComment
    };
  
    if (!user || !user.token) {
      dispatch(setNotification("User not authenticated", "error"));
      return;
    };
  
    try {
      dispatch(addNewComment(id, commentData));
    } catch (error) {
      dispatch(setNotification("Error adding a comment.", "error"));
    };
  };
  

  if (!blog) {
    return <Loading />;
  };

  return (
    <div className="container py-4 d-flex gap-4">
      <div className="w-100">
        <div className="border rounded p-3">
          <h1 className="card-title mb-3">{blog.title}</h1>

          <p className="mb-3">
            <a href={blog.url} className="text-decoration-none" target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <p className="text-muted mb-0">Likes:</p>
              <button onClick={handleLike} className="btn btn-outline-primary gap-2 d-flex align-items-center">
                {likes}
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
            </div>

            <p className="text-muted mb-0">
              Added by:{" "}
              <Link to={`/users/${blog.user._id}`} className="text-decoration-none">
                {blog.user.username}
              </Link>
            </p>

            {user && user.username === blog.user.username && (
              <button onClick={handleDelete} className="btn btn-outline-danger">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-100">
        <div>
          <h3>Comments</h3>
          <CommentForm id={id} onAddComment={handleAddComment} />
          {blog.comments && blog.comments.length > 0 ? (
            <ul className="list-group mt-3 gap-2">
              {blog.comments.map(comment => (
                <li key={comment._id} className="list-group-item d-flex justify-content-between align-items-center border rounded">
                  {comment.content}
                  <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted mt-3">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;