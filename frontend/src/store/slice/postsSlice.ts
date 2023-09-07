import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../typings/types";

interface PostsState {
  isLoading: boolean;
  posts: Post[];
  error: Error | null;
}

const initialState: PostsState = {
  isLoading: true,
  posts: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
