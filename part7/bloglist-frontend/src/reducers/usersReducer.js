import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    singleUser: null
  },
  reducers: {
    setUsers(state, action) {
      state.allUsers = action.payload;
    },
    setSingleUser(state, action) {
      state.singleUser = action.payload;
    }
  }
});

export const { setUsers, setSingleUser } = userSlice.actions;

export const fetchUser = (id) => async (dispatch) => {
  try {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    if (!user || !user.token) {
      throw new Error("Invalid or expired token");
    };

    const fetchedUser = await userService.getUser(id, user.token);
    dispatch(setSingleUser(fetchedUser));
  } catch (error) {
    dispatch(setNotification("Error fetching user", "error"));
  };
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    if (!user || !user.token) {
      throw new Error("Invalid or expired token");
    };

    const users = await userService.getAllUsers(user.token);
    dispatch(setUsers(users));
  } catch (error) {
    dispatch(setNotification("Error fetching users", "error"));
  };
};

export default userSlice.reducer;