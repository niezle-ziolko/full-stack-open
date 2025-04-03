import { Link } from "react-router-dom";

export default function Menu() {
  return(
    <nav>
      <ul>
        <li>
          <Link to="/">Anecdotes</Link>
        </li>
        <li>
          <Link to="/create">Create New Anecdote</Link>
        </li>
      </ul>
    </nav>
  );
};