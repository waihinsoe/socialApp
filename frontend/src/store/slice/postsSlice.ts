import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../typings/types";

interface PostsState {
  isLoading: boolean;
  items: Post[];
  error: Error | null;
}

const initialState: PostsState = {
  isLoading: true,
  items: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
