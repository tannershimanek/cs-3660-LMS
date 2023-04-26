import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCoaches = async () => {
  const response = await fetch(`http://localhost:8080/coaches`);
  const data = await response.json();
  return data;
};

export const createTeam = async (id: string, body: any) => {
  const options = {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:8080/teams/`, options);
};

export const updateTeam = async (id: string, body: any) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:8080/teams/${id}`, options);
};

export const getTeamData = async (id: string) => {
  const response = await fetch(`http://localhost:8080/teams/coach/${id}`);
  const data = await response.json();
  return data;
};

export const getSortedTeams = async (sortCol: string, sortDir: string) => {
  const response = await fetch(
    `http://localhost:8080/teams/?sortCol=${sortCol}e&sortDir=${sortDir}`
  );
  const data = await response.json();
  return data;
};

export const getFilteredTeams = async (
  filterCol: string,
  filterStr: string
) => {
  const response = await fetch(
    `http://localhost:8080/teams/?${filterCol}=teamName&filterStr=${filterStr}`
  );
  const data = await response.json();
  return data;
};

// THUNKS FOR REDUX

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
    await fetch(`http://localhost:8080/teams/${id}}`, { method: "DELETE" });
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

export const updateTeamT = createAsyncThunk<any, string>(
  "table/updateTeam",
  async (id, body) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch(`http://localhost:8080/teams/${id}}`, options);
    const response = await fetch("http://localhost:8080/teams/");
    const data = await response.json();
    return data;
  }
);
