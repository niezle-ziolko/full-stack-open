import { useState } from 'react';

const App = () => {
  // Array of anecdotes to be displayed
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  // State to keep track of votes for each anecdote
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  // State to keep track of the currently selected anecdote
  const [selected, setSelected] = useState(0);

  // Function to select a random anecdote
  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Function to vote for the currently selected anecdote
  const voteForAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  // Function to get the anecdote with the most votes
  const getAnecdoteWithMostVotes = () => {
    const maxVotes = Math.max(...votes);
    const index = votes.indexOf(maxVotes);
    return anecdotes[index];
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <button onClick={getRandomAnecdote}>Next Anecdote</button>
      <button onClick={voteForAnecdote}>Vote</button>

      <h2>Anecdote with Most Votes</h2>
      <p>{getAnecdoteWithMostVotes()}</p>
    </div>
  );
};

export default App;