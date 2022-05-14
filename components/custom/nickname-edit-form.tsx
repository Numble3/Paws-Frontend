import React, { MouseEvent, useState } from "react";
import style from "styles/edit-form.module.css";

const NicknameEditForm = ({ onClose, onClick, onChange, nickname }: { onClose: () => void, onClick: ()=> void, onChange: (e:any)=> void, nickname: string }) => {
  const [isError, setisError] = useState(false);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style["form-container"]}>
          <div className={style.title}>닉네임 수정</div>
          <div className={style.form}>
            <input
              className={`${style.input}  ${isError ? style.err : ""}`}
              type="text"
              value={nickname}
              onChange={onChange}
            />
            <div className={style.message}>
              <span>최대 10자</span>
              {isError && <span>에러 메세지</span>}
            </div>
            <div className={style["button-wrapper"]}>
              <button className={style.close} onClick={onClose}>
                취소
              </button>
              <button className={style.submit} onClick={onClick}>수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicknameEditForm;
