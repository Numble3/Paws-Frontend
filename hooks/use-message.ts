import { RootState } from './../reducers/index';
import {  useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';

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
