import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../reducers/usersReducer';
import { fetchBlogTitles } from '../reducers/blogTitlesReducer';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.singleUser);
  const blogTitles = useSelector((state) => state.blogTitles);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user.posts) {
      dispatch(fetchBlogTitles(user.posts));
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Blogs created:</strong> {user.created}</p>
      <h3>Blog Titles:</h3>
      <ul>
        {blogTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;