import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../typings/types";

interface OwnerState {
  isLoading: boolean;
  owner: User | null;
  error: Error | null;
}

const initialState: OwnerState = {
  isLoading: true,
  owner: null,
  error: null,
};

export const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setOwner: (state, action: PayloadAction<User>) => {
      state.owner = action.payload;
    },
  },
});

export const { setOwner } = ownerSlice.actions;

export default ownerSlice.reducer;
