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
    REGISTER_SUCCESS: (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
    },
    REGISTER_FAIL: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    USER_LOADED: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    AUTH_ERROR: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    LOGIN_FAILED: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    LOGOUT: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    DELETE_ACCOUNT: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    }
  },
});

export default authSlice;