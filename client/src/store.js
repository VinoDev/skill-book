import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit"
import alertSlice from './Features/Alert/state/alertSlice.js';
import authSlice from './Features/Auth/state/authSlice.js';
import profileSlice from './Features/profile/state/profileSlice.js';


const rootReducer = combineReducers({
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store;