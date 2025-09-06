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

    removeUserFromFeed: (state, action) => {
      const newFeed = state.feed.filter((item) => item?._id !== action.payload);
      state.feed = newFeed;
    },
  },
});

export const { addUserFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
