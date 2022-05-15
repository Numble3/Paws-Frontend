import { combineReducers } from "@reduxjs/toolkit";
import likeSlice from "./like";
import modalSlice from "./modal";

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  like: likeSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
