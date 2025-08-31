import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.userId = initialState.userId;
      state.user = initialState.user;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
