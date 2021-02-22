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
        //set token to local storge
        state.token = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
    },
    registerFail: (state, action) => {
      //remove token from local storage
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    }   
  },
});

export default authSlice;