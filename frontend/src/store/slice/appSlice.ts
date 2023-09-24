import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config/config";
import { setOwner } from "./ownerSlice";
import { setUsers } from "./usersSlice";
import { setLikes } from "./likesSlice";
import { setComments } from "./commetsSlice";
import { setShares } from "./sharesSlice";
import { setPosts } from "./postsSlice";
import { setReplys } from "./replysSlice";
import { setFriendRequests } from "./friendRequestsSlice";
import { RootState } from "../store";

interface AppState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: AppState = {
  isLoading: true,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (accessToken: string, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/app`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      const {
        owner,
        users,
        likes,
        comments,
        shares,
        posts,
        replys,
        friendRequests,
      } = responseJson;

      thunkAPI.dispatch(setOwner(owner));
      thunkAPI.dispatch(setUsers(users));
      thunkAPI.dispatch(setLikes(likes));
      thunkAPI.dispatch(setComments(comments));
      thunkAPI.dispatch(setShares(shares));
      thunkAPI.dispatch(setPosts(posts));
      thunkAPI.dispatch(setReplys(replys));
      thunkAPI.dispatch(setFriendRequests(friendRequests));
      thunkAPI.dispatch(setAppLoading(false));
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const appData = (state: RootState) => {
  const owner = state.owner.items;
  const users = state.users.items;
  const likes = state.likes.items;
  const comments = state.comments.items;
  const shares = state.shares.items;
  const posts = state.posts.items;
  const replys = state.replys.items;
  const friendRequests = state.friendRequests;
  return {
    owner,
    users,
    likes,
    comments,
    shares,
    posts,
    replys,
    friendRequests,
  };
};

export const { setAppLoading } = appSlice.actions;

export default appSlice.reducer;
