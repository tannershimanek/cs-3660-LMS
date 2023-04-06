import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: {
        name: "undefined",
        id: '0', 
        showModal: false,
    }
  },
  reducers: {
    setName: (state, action) => { 
        state.value.name = action.payload;
    },
    setId: (state, action) => {
        state.value.id = action.payload;
    },
    toggleModal: (state, action) => {
        state.value.showModal = action.payload;
    }
  },
});

export const { toggleModal, setId, setName } = modalSlice.actions;
export default modalSlice.reducer;