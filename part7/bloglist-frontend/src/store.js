import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import usersReducer from './reducers/usersReducer';
import blogTitlesReducer from './reducers/blogTitlesReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    users: usersReducer,
    blogTitles: blogTitlesReducer,
    notification: notificationReducer,
  }
});

export default store;