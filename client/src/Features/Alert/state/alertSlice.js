import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: []
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    setAlert: (state, action) => {
      console.log(action.payload);
      state.alerts = [...state.alerts, action.payload]
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
    }   
  },
});

export default alertSlice;