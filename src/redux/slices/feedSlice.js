import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addUserFeed: (state, action) => {
      state.feed = action.payload;
    },

    removeFeed: (state) => {
      state.feed = initialState.feed;
    },
  },
});

export const { addUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
