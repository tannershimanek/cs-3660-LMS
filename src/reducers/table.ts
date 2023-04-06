import { createSlice } from "@reduxjs/toolkit";
import { teamData } from "../services/teamData";

let filteredState = { ...teamData }.data; // cache for filtering

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    value: { ...teamData },
  },
  reducers: {
    sortAsc: (state, action) => {
      state.value.data = action.payload;
      filteredState = state.value.data;
    },
    sortDesc: (state, action) => {
      state.value.data = action.payload;
      filteredState = state.value.data;
    },
    sortCol: (state, action) => {
      console.log(action.payload);
      state.value.app.sortCol = action.payload;
    },
    sortDir: (state, action) => {
      state.value.app.sortDir = action.payload;
    },
    deleteRow: (state, action) => {
      console.log(action.payload)
      state.value.data = state.value.data.filter(
        (item) => item.id != action.payload
      );
      filteredState = filteredState.filter(
        (item) => item.id != action.payload
      );
    },
    filterTable: (state, action) => {
      const filteredData = filteredState.filter((item: any) => {
        if (item.teamName.toLowerCase().includes(action.payload.toLowerCase()))
          return item;
        if (item.coachName.toLowerCase().includes(action.payload.toLowerCase()))
          return item;
        if (
          item.coachPhone.toLowerCase().includes(action.payload.toLowerCase())
        )
          return item;
        if (
          item.numPlayers.toLowerCase().includes(action.payload.toLowerCase())
        )
          return item;
        return null;
      });
      state.value.data = filteredData;
    },
    resetTable: (state) => {
      state.value = { ...teamData };
      filteredState = { ...teamData }.data;
    },
  },
});

export const {
  sortAsc,
  sortDesc,
  deleteRow,
  sortCol,
  resetTable,
  sortDir,
  filterTable,
} = tableSlice.actions;
export default tableSlice.reducer;
