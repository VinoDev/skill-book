import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: []
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    SET_ALERT: (state, action) => {
      state.alerts = [...state.alerts, action.payload]
    },
    REMOVE_ALERT: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
    }   
  },
});

export default alertSlice;