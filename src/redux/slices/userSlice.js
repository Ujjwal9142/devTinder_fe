import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    logoutUser: (state) => {
      state.userId = initialState.userId;
      state.user = initialState.user;
    },

    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserId, logoutUser, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
