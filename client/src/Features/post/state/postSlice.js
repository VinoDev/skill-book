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
          state.loading = true;
      },
      UPDATE_LIKES: (state, action) => {
          state.posts = state.posts.map(post => {
              if(post._id === action.payload.postId){
                  return {...post, likes: action.payload.resJson}
              } else {
                  return post
              }
          });
          state.loading = false;
      },
      DELETE_POST: (state, action) => {
          state.posts = state.posts.filter(post => post._id !== action.payload.postId);
          state.loading = false;
      },
      ADD_POST: (state, action) => {
          state.posts = [action.payload, ...state.posts];
          state.loading = false;
      }
    }
});

export default postSlice;