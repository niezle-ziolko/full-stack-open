import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";

import { createAnecdote } from "../services/anecdotes";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      dispatch(showNotification(`You added "${newAnecdote.content}"`, 5));
    }
  });

  const addAnecdote = (event) => {
    event.preventDefault();
    anecdoteMutation.mutate(content);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;