import useModal from 'hooks/use-modal';
import React from "react";
import editStyle from "styles/edit-form.module.css";
import style from "styles/video-edit-box.module.css";
import AlertModal from './alert-modal';

const VideoEditBox = ({ onClose }: { onClose: () => void }) => {
  const [alertOpen, onAlertClose, AlertHandler, alertType] = useModal("alert");
  document.body.style.overflow = "hidden";
  return (
    <div className={editStyle.background}>
      <div className={style.wrapper}>
        <div className={style["box-wrapper"]}>
          <div className={style.padding}>
            <div id="delete"  className={style.button} onClick={AlertHandler}>영상 삭제</div>
            <div className={`${style.button} ${style["border-top"]}`} onClick={onClose}>영상 수정</div>
          </div>
          <div>
            <div className={`${style.button} ${style["margin-top"]}`} onClick={onClose}>취소</div>
          </div>
        </div>
      </div>
      {alertOpen && <AlertModal alertType={alertType!} onClose={onAlertClose} />}
    </div>
  );
};

export default VideoEditBox;
