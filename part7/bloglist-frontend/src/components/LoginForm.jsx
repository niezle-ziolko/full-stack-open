import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

import loginService from "../services/login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login(username, password);
      dispatch(setUser(userData)); // Set user in Redux store
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setNotification("Logged in successfully.", "success"));
    } catch (error) {
      dispatch(setNotification(error.message, "error"));
    };
  };

  return (
    <div className="container py-4 d-grid justify-content-center">
      <h2 className="mb-4 text-center">Log in to the application</h2>

      <form onSubmit={handleLogin} className="p-4 border rounded bg-light" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;