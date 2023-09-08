import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Share } from "../../typings/types";

interface SharesState {
  isLoading: boolean;
  items: Share[];
  error: Error | null;
}

const initialState: SharesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const sharesSlice = createSlice({
  name: "shares",
  initialState,
  reducers: {
    setShares: (state, action: PayloadAction<Share[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setShares } = sharesSlice.actions;

export default sharesSlice.reducer;
