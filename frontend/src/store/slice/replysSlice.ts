import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reply } from "../../typings/types";

interface ReplysState {
  isLoading: boolean;
  replys: Reply[];
  error: Error | null;
}

const initialState: ReplysState = {
  isLoading: true,
  replys: [],
  error: null,
};

export const replysSlice = createSlice({
  name: "replys",
  initialState,
  reducers: {
    setReplys: (state, action: PayloadAction<Reply[]>) => {
      state.replys = action.payload;
    },
  },
});

export const { setReplys } = replysSlice.actions;

export default replysSlice.reducer;
