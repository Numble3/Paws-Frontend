import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageOpen:false,
  error:false,
  errorMessage:"",
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers:{
    open(state,action) {
      state.messageOpen = true;
    },
    close(state,action){
      state.messageOpen = false;
    },
    isError(state, action){
      state.error = action.payload.isError;
    },
    setErrorMessage(state, action){
      state.errorMessage = action.payload.errorMessage;
    }
  }
})

export default modalSlice;