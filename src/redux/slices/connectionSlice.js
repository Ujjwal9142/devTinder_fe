import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: [],
};

export const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },

    removeConnections: (state) => {
      state.connections = initialState.connections;
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
