import { setNotification } from "./notificationReducer";
import blogService from "../services/blogs";

const blogReducer = (state = { allBlogs: [], singleBlog: null }, action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return { ...state, allBlogs: action.data };
    case "SET_SINGLE_BLOG":
      return { ...state, singleBlog: action.data };
    case "ADD_BLOG":
      return { ...state, allBlogs: [...state.allBlogs, action.data] };
    case "ADD_COMMENT":
      return {
        ...state,
        singleBlog: {
          ...state.singleBlog,
          comments: [...(state.singleBlog?.comments || []), action.data]
        }
      };
    default:
      return state;
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: "INIT_BLOGS",
        data: blogs
      });
    } catch (error) {
      dispatch(setNotification("Error fetching blogs", "error"));
    };
  };
};

export const fetchBlog = (postId) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getBlog(postId);
      dispatch({
        type: "SET_SINGLE_BLOG",
        data: blog
      });
    } catch (error) {
      dispatch(setNotification("Error fetching blog", "error"));
    };
  };
};

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    if (!user || !user.token) {
      dispatch(setNotification("User is not authenticated", "error"));
      return;
    };

    try {
      const createdBlog = await blogService.addBlog(newBlog, user.token);
      dispatch({
        type: "ADD_BLOG",
        data: createdBlog
      });
      dispatch(setNotification("Blog added successfully", "success"));
    } catch (error) {
      dispatch(setNotification("Error adding a blog", "error"));
    };
  };
};

export const addNewComment = (postId, commentData) => {
  return async (dispatch) => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    if (!user || !user.token) {
      dispatch(setNotification("User is not authenticated", "error"));
      return;
    };

    try {
      const createdComment = await blogService.addComment(postId, commentData, user.token);
      dispatch({
        type: "ADD_COMMENT",
        data: createdComment
      });
      dispatch(setNotification("Comment added successfully", "success"));
      return createdComment;
    } catch (error) {
      dispatch(setNotification("Error adding a comment", "error"));
    };
  };
};


export default blogReducer;