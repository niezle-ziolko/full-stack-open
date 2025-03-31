import { createSlice } from "@reduxjs/toolkit";

import { getAnecdotes, createAnecdote as createAnecdoteService, voteForAnecdote as voteForAnecdoteService } from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => action.payload,
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    voteAnecdote: (state, action) => {
      return [...state.map(a => a.id !== action.payload.id ? a : action.payload)]
        .sort((a, b) => b.votes - a.votes)
    }
  }
});

export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await getAnecdotes();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await createAnecdoteService(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const voteForAnecdote = (id) => async (dispatch, getState) => {
  const anecdote = getState().anecdotes.find(a => a.id === id);
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await voteForAnecdoteService(id, updatedAnecdote);
  dispatch(voteAnecdote(response));
};

export default anecdoteSlice.reducer;