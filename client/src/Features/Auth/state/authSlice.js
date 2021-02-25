import { createSlice } from "@reduxjs/toolkit";

//Saving token to localStorage is a temporary unsecure solution.
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    registerSuccess: (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
    },
    registerFail: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    authError: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    }   
  },
});

export default authSlice;