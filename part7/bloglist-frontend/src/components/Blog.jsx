import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-summary">
        <Link to={`/blogs/${blog._id}`} className="blog-title">{blog.title}</Link>
      </div>
    </div>
  );
};

export default Blog;