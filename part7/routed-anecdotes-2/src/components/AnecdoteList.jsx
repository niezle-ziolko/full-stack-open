import { Link } from "react-router-dom";

export default function AnecdoteList({ anecdotes, successMessage }) {
  return(
    <div>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <h2>All Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};