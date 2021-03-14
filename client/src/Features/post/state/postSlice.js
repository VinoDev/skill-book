import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    GET_POSTS: (state, action) => {
        state.posts = action.payload;
        state.loading = false;
    },
    POST_ERROR: (state, action) => {
        state.error = action.payload
        state.loading = false;
    },
    LOADING_POSTS: (state) => {
        state.loading = true
    }
  },
});

export default postSlice;