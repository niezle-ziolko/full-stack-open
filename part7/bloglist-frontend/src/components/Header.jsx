import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faUsers } from "@fortawesome/free-solid-svg-icons";

import { logoutUser, setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));
        } catch (e) {
          console.error("Błąd parsowania usera z localStorage:", e);
        };
      };
    };
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    dispatch(setNotification("Logout successfully.", "success"));
  };

  return (
    <div
      style={{ borderRadius: "0 0 6px 6px" }}
      className="container py-3 d-flex justify-content-between border-start border-end border-bottom"
    >
      <h2 className="mb-0">Blogs app</h2>

      {user && (
        <nav className="d-flex">
          <ul className="nav align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link"><FontAwesomeIcon icon={faListUl} /></Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link"><FontAwesomeIcon icon={faUsers} /></Link>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled">
                {user?.username ? `${user.username} is logged in` : "No user is logged in"}
              </span>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
