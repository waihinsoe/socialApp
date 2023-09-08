import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FriendRequest } from "../../typings/types";

interface FriendRequestsState {
  isLoading: boolean;
  items: FriendRequest[];
  error: Error | null;
}

const initialState: FriendRequestsState = {
  isLoading: true,
  items: [],
  error: null,
};

export const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState,
  reducers: {
    setFriendRequests: (state, action: PayloadAction<FriendRequest[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setFriendRequests } = friendRequestsSlice.actions;

export default friendRequestsSlice.reducer;
