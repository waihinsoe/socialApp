import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reply } from "../../typings/types";

interface ReplysState {
  isLoading: boolean;
  items: Reply[];
  error: Error | null;
}

const initialState: ReplysState = {
  isLoading: true,
  items: [],
  error: null,
};

export const replysSlice = createSlice({
  name: "replys",
  initialState,
  reducers: {
    setReplys: (state, action: PayloadAction<Reply[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setReplys } = replysSlice.actions;

export default replysSlice.reducer;
