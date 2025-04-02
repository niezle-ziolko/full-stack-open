import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const Header = () => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);

  const handleLogout = () => {
    dispatch(logoutUser()); // Clear user in Redux store
    localStorage.removeItem('user');
    dispatch(setNotification('Logout successfully.', 'success'));
  };

  return (
    <div>
      <h2>blogs</h2>
      <nav>
        <ul>
          <li>
            {user?.username ? `${user.username} is logged in` : 'No user is logged in'}
          </li>
          <li>
            <Link to={'/users'}>User list</Link>
          </li>
        </ul>
      </nav>
      {user && <button onClick={handleLogout}>logout</button>}
    </div>
  );
};

export default Header;