import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
};

export const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;
    },

    removeRequests: (state) => {
      state.requests = initialState.requests;
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
