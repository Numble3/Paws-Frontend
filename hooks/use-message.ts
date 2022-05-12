import { Dispatch, MouseEvent, SetStateAction, useCallback } from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import modalSlice from 'reducers/modal';

type ReturnType = {
  successHandler: (e: any) => void | Dispatch<SetStateAction<boolean>>;
  errorHandler: (e: any) => void | Dispatch<SetStateAction<boolean>>;
  isError: boolean
};

const useMessage = (): ReturnType => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  
  const successHandler = useCallback(()=>{
    setIsError(false);
    dispatch(modalSlice.actions.open({}));
    setTimeout(()=>{
      dispatch(modalSlice.actions.close({}));
    },3000);
  },[]);

  const errorHandler = useCallback(()=>{
    setIsError(true);
    dispatch(modalSlice.actions.open({}));
    setTimeout(()=>{
      dispatch(modalSlice.actions.close({}));
    },3000);
  },[]);

  return {  successHandler, errorHandler, isError };
};

export default useMessage;
