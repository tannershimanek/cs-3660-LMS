import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../reducers/table";
import viewReducer from "../reducers/views";
import modalReducer from "../reducers/modal";
import alertReducer from "../reducers/alerts";
import editReducer from "../reducers/edit";

export const store = configureStore({
  reducer: {
    views: viewReducer,
    table: tableReducer,
    modal: modalReducer,
    alert: alertReducer,
    edit: editReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// https://redux-toolkit.js.org/tutorials/typescript