import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const fetchBlogTitles = createAsyncThunk(
  'fetchBlogTitles',
  async (postIds) => {
    const titles = await Promise.all(
      postIds.map(async (postId) => {
        try {
          const blog = await blogService.getBlog(postId);
          return blog.title;
        } catch (error) {
          console.error(`Error fetching blog with ID ${postId}:`, error);
          return null;
        }
      })
    );

    return titles.filter(title => title !== null);
  }
);

const blogTitlesSlice = createSlice({
  name: 'blogTitles',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogTitles.fulfilled, (state, action) => {
        return action.payload;
      });
  }
});

export default blogTitlesSlice.reducer;