import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../typings/types";

interface OwnerState {
  isLoading: boolean;
  items: User | null;
  error: Error | null;
}

const initialState: OwnerState = {
  isLoading: true,
  items: null,
  error: null,
};

export const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setOwner: (state, action: PayloadAction<User>) => {
      state.items = action.payload;
    },
  },
});

export const { setOwner } = ownerSlice.actions;

export default ownerSlice.reducer;
