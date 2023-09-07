import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Like } from "../../typings/types";

interface LikesState {
  isLoading: boolean;
  likes: Like[];
  error: Error | null;
}

const initialState: LikesState = {
  isLoading: true,
  likes: [],
  error: null,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action: PayloadAction<Like[]>) => {
      state.likes = action.payload;
    },
  },
});

export const { setLikes } = likesSlice.actions;

export default likesSlice.reducer;
