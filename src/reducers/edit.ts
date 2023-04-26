import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTeam = createAsyncThunk<any, string>(
    "table/getTeam",
    async (id) => {
      const response = await fetch(`http://localhost:8080/teams/coach/${id}`);
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

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    value: {
        team: {},
        id: 0, 
        showModal: false,
        formTeamName: "",
        formCoachName: "",
        formCoachPhone: "",
        formNumPlayers: "",
        formImage: "",

    }
  },
  reducers: {
    setTeam: (state, action) => { 
        state.value.team = action.payload;
    },
    setRowId: (state, action) => {
      // console.log(action.payload)
      localStorage.setItem("editTeamId", action.payload)
        state.value.id = action.payload;
    },
    toggleEditModal: (state, action) => {
        state.value.showModal = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.value.team = action.payload;
    });
  },
});

export const { toggleEditModal, setRowId, setTeam } = editSlice.actions;
export default editSlice.reducer;