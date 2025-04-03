import { Link, useParams } from "react-router-dom";

export default function Anecdote({ anecdotes }) {
  const { id } = useParams();
  const anecdote = anecdotes.find(a => a.id === Number(id));

  if (!anecdote) {
    return <p>Anecdote not found.</p>;
  };

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Url: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
      <Link to="/">Back to Anecdotes</Link>
    </div>
  );
};