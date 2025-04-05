import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";

import { fetchUsers } from "../reducers/usersReducer";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!users) {
    return <Loading />;
  };

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <table className="w-50">
        <thead>
          <tr>
            <th>
              <p className="text-muted mb-0 fw-normal">Name</p>
            </th>
            <th>
              <p className="text-muted mb-0 fw-normal">Blogs created</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="text-decoration-none">{user.username}</Link>
              </td>
              <td>{user.posts.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;