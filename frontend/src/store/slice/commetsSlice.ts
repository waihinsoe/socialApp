import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../typings/types";

interface CommentsState {
  isLoading: boolean;
  comments: Comment[];
  error: Error | null;
}

const initialState: CommentsState = {
  isLoading: true,
  comments: [],
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
