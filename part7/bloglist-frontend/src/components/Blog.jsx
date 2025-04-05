import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  return (
    <div className="blog card border p-2">
      <div className="card-body p-2">
        <h5 className="card-title mb-0">
          <Link to={`/blogs/${blog._id}`} className="text-decoration-none text-primary">
            {blog.title}
          </Link>
        </h5>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default Blog;