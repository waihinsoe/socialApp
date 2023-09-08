import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Like } from "../../typings/types";

interface LikesState {
  isLoading: boolean;
  items: Like[];
  error: Error | null;
}

const initialState: LikesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action: PayloadAction<Like[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setLikes } = likesSlice.actions;

export default likesSlice.reducer;
