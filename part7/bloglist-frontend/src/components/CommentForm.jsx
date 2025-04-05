import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ id, onAddComment }) => {
  const [newBlogComment, setNewBlogComment] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddComment( id, newBlogComment );
    setNewBlogComment("");
  };

  return(
    <form className="p-3 border rounded bg-light mb-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">Add a Comment</h5>

      <div className="mb-3">
        <label htmlFor="blog-comment" className="form-label">Comment</label>
        <input
          id="blog-comment"
          className="form-control"
          type="text"
          value={newBlogComment}
          onChange={({ target }) => setNewBlogComment(target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired
};

export default CommentForm;