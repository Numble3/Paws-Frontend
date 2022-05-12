import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modal';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;