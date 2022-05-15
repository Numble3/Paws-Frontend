import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { [key: string]: any } = {
  videoLike: {},
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    active(state, action: PayloadAction<string>) {
      state.videoLike[action.payload] = true;
    },
    inactive(state, action: PayloadAction<string>) {
      state.videoLike[action.payload] = false;
    },
  },
});

export default likeSlice;
