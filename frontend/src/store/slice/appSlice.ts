import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config/config";

interface AppState {
  isLoading: boolean;
  error: Error | null;
}

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (accessToken: string, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/app`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    console.log(responseJson);
  }
);

const initialState: AppState = {
  isLoading: true,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;
