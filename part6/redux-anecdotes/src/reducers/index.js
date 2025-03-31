import { combineReducers } from "redux";

import filterReducer from "./filterReducer";
import anecdoteReducer from "./anecdoteReducer";

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
});

export default rootReducer;