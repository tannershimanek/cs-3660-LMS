import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    value: {
        message: "...",
        showAlert: false,
    }
  },
  reducers: {
    setMessage: (state, action) => { 
        state.value.message = action.payload;
    },
    toggleAlert: (state, action) => {
        state.value.showAlert = action.payload;
    }
  },
});

export const { toggleAlert, setMessage } = alertSlice.actions;
export default alertSlice.reducer;