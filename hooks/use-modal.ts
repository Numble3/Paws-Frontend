import { Dispatch, MouseEvent, SetStateAction, useCallback } from "react";
import { useState } from "react";

type ReturnType = [
  boolean,
  () => void,
  (e: any) => void | Dispatch<SetStateAction<boolean>>,
  string?
];

const useModal = (type: "edit"|"alert"): ReturnType => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState("");

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const AlertHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setAlertType((e.target as HTMLDivElement).id);
    setIsOpen(true);
  }, []);

  if (type === "edit") {
    return [isOpen, onClose, setIsOpen];
  } else {
    return [isOpen, onClose, AlertHandler, alertType];
  }
};

export default useModal;
