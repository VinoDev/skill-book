import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit"
import authSlice from './Features/auth/state/authSlice.js';
import profileSlice from './Features/profile/state/profileSlice.js';
import postSlice from './Features/post/state/postSlice.js';
import alertSlice from './Features/alert/state/alertSlice.js';


const rootReducer = combineReducers({
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    post: postSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store;