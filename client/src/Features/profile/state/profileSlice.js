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
    }   
  },
});

export default profileSlice;