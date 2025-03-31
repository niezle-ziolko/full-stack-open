import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { getAnecdotes, voteForAnecdote } from "../services/anecdotes";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const { data: anecdotes, error, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1
  });

  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"])
      dispatch(showNotification(`You voted for "${updatedAnecdote.content}"`, 5))
    }
  });

  if (isLoading) return <div>Loading anecdotes...</div>;
  if (error) return <div>Anecdote service not available due to server problems.</div>;

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteMutation.mutate(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;