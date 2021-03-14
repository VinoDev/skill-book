import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {}
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    GET_PROFILE: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    PROFILE_ERROR: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
      state.profile = null;
    },
    CLEAR_PROFILE: (state, action) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
    ADD_EXPERIENCE: (state, action) => {
      state.profile = action.payload;
      state.loading = false;    
    },
    ADD_EDUCATION: (state, action) => {
      state.profile = action.payload;
      state.loading = false;    
    },
    REMOVE_EXPERIENCE: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    REMOVE_EDUCATION: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    GET_ALL_PROFILES: (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
    },
    GET_REPOS: (state, action) => {
      state.repos = action.payload;
      state.loading = false;
    },
    LOADING_DATA: (state) => {
      state.loading = true
    }
  },
});

export default profileSlice;