import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageOpen:false
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
    }
  }
})

export default modalSlice;