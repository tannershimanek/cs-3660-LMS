import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { teamData } from "../services/teamData";

export interface TeamTable {
  data: {
    id: number;
    teamName: string;
    coachName: string;
    coachPhone: string;
    numPlayers: string;
    image: string;
  }[];
}

let filteredState = { ...teamData }.data; // cache for filtering

export const fetchTeamData = createAsyncThunk(
  "table/fetchTeamData",
  async () => {
    const response = await fetch("http://localhost:8080/teams/");
    const data = await response.json();
    return data;
  }
);

export const deleteTeam = createAsyncThunk<any, string>(
  "table/deleteTeam",
  async (id) => {
    await fetch(`http://localhost:8080/teams/${id}}`, { method: "DELETE"});
    const response = await fetch("http://localhost:8080/teams/");
    const data = await response.json();
    return data;
  }
);

export const getTeam = createAsyncThunk<any, string>(
  "table/getTeam",
  async (id) => {
    const response = await fetch(`http://localhost:8080/teams/${id}`);
    const data = await response.json();
    return data;
  }
);

export const updateTeam = createAsyncThunk<any, string>(
  "table/updateTeam",
  async (id, body) => {
      const options = {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      }
    await fetch(`http://localhost:8080/teams/${id}}`, options);
    const response = await fetch("http://localhost:8080/teams/");
    const data = await response.json();
    return data;
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    value: { ...teamData },
    isLoading: false,
    error: null,
    currentTeam: {},
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
      console.log(action.payload);
      state.value.data = state.value.data.filter(
        // eslint-disable-next-line
        (item) => item.id != action.payload
      );
      filteredState = filteredState.filter(
        // eslint-disable-next-line
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
  extraReducers: (builder) => {
    builder.addCase(fetchTeamData.fulfilled, (state, action) => {
      state.value.data = action.payload;
      filteredState = { ...state.value }.data;
      state.isLoading = false;

      console.log("jsdf", state.value.data);
    });
    builder.addCase(fetchTeamData.pending, (state, action) => {
      state.value.data = [];
      state.isLoading = true;
    });
    builder.addCase(fetchTeamData.rejected, (state, action) => {
      state.value.data = [];
      state.isLoading = false;
      // state.error = action.error.message;
    });

    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.value.data = action.payload;
      filteredState = { ...state.value }.data;
      state.isLoading = false;

    });

    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.currentTeam = action.payload;
    });
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
