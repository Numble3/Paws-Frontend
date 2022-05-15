import { RootState } from './../reducers/index';
import { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import modalSlice from 'reducers/modal';

type ReturnType = {
  getMessage:boolean,
  error: boolean
};

const useMessage = (): ReturnType => {
  const {error} = useSelector((state:RootState)=> state.modal);
  const [getMessage, setMassage] = useState(false);
  const {messageOpen} = useSelector((state:RootState)=> state.modal);

  useEffect(()=>{
    if(messageOpen){
        setMassage(true);
    }else{
      setMassage(false);
    }
  },[messageOpen]);
  
  

  return { getMessage, error };
};

export default useMessage;
