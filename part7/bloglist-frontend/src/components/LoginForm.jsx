import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

import loginService from '../services/login';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login(username, password);
      dispatch(setUser(userData)); // Set user in Redux store
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setNotification('Logged in successfully.', 'success'));
    } catch (error) {
      dispatch(setNotification(error.message, 'error'));
    };
  };

  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;