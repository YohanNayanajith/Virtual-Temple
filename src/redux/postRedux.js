import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts:null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getPostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts = action.payload;
    },
    getPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    removePosts: (state) => {
      state.posts = null;
    },
    //DELETE
    deletePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts.splice(
        state.posts.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deletePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePostSuccess: (state, action) => {
      state.isFetching = false;
      state.otherPosts[
        state.posts.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.Post;
    },
    updatePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addPostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts.push(action.payload);
    },
    addPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPostStart,
  getPostSuccess,
  getPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  addPostStart,
  addPostSuccess,
  addPostFailure,
  removePosts,
} = postSlice.actions;
export default postSlice.reducer;
