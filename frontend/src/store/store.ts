import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import appSlice from "./slice/appSlice";
import ownerSlice from "./slice/ownerSlice";
import usersSlice from "./slice/usersSlice";
import postsSlice from "./slice/postsSlice";
import likesSlice from "./slice/likesSlice";
import commentsSlice from "./slice/commetsSlice";
import replysSlice from "./slice/replysSlice";
import sharesSlice from "./slice/sharesSlice";
import friendRequestsSlice from "./slice/friendRequestsSlice";
// ...

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    app: appSlice,
    owner: ownerSlice,
    users: usersSlice,
    posts: postsSlice,
    likes: likesSlice,
    comments: commentsSlice,
    replys: replysSlice,
    shares: sharesSlice,
    friendRequests: friendRequestsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
