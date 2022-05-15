import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { [key: string]: any } = {
  videoLike: {},
  commentLike: {},
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
    commentActive(
      state,
      action: PayloadAction<{ videoId: string; commentId: string }>
    ) {
      const vId = action.payload.videoId;
      const cId = action.payload.commentId;
      if (!state.commentLike[vId]) state.commentLike[vId] = {};
      state.commentLike[vId][cId] = true;
    },
    commentInactive(
      state,
      action: PayloadAction<{ videoId: string; commentId: string }>
    ) {
      const vId = action.payload.videoId;
      const cId = action.payload.commentId;
      if (!state.commentLike[vId]) state.commentLike[vId] = {};
      state.commentLike[vId][cId] = false;
    },
  },
});

export default likeSlice;
