import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
  error: Error | null;
}

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (userId: number, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
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
