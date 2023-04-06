import { createSlice } from "@reduxjs/toolkit";

export const viewSlice = createSlice({
  name: "view",
  initialState: {
    value: "home",
  },
  reducers: {
    viewHome: (state) => {
      state.value = "home";
    },
    viewTeams: (state) => {
      state.value = "teams";
    },
    changeView: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { viewHome, viewTeams, changeView } = viewSlice.actions;
export default viewSlice.reducer;