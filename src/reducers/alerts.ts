import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    value: {
        message: "...",
        showAlert: false,
        variant: "success",
    }
  },
  reducers: {
    setMessage: (state, action) => { 
        state.value.message = action.payload;
    },
    setVariant: (state, action) => {
        state.value.variant = action.payload;
    },
    toggleAlert: (state, action) => {
        state.value.showAlert = action.payload;
    }
  },
});

export const { toggleAlert, setMessage, setVariant } = alertSlice.actions;
export default alertSlice.reducer;