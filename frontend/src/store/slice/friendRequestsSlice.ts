import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FriendRequest } from "../../typings/types";

interface FriendRequestsState {
  isLoading: boolean;
  friendRequests: FriendRequest[];
  error: Error | null;
}

const initialState: FriendRequestsState = {
  isLoading: true,
  friendRequests: [],
  error: null,
};

export const friendRequestsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setFriendRequests: (state, action: PayloadAction<FriendRequest[]>) => {
      state.friendRequests = action.payload;
    },
  },
});

export const { setFriendRequests } = friendRequestsSlice.actions;

export default friendRequestsSlice.reducer;
