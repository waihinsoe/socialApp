import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../typings/types";

interface UsersState {
  isLoading: boolean;
  users: User[];
  error: Error | null;
}

const initialState: UsersState = {
  isLoading: true,
  users: [],
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
