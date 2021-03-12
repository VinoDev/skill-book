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
    getProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    profileError: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    clearProfile: (state, action) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
    addExperience: (state, action) => {
      state.profile = action.payload;
      state.loading = false;    
    },
    addEducation: (state, action) => {
      state.profile = action.payload;
      state.loading = false;    
    },
    removeExperience: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    removeEducation: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    }
  },
});

export default profileSlice;