import React, { useState } from "react";
import style from "styles/edit-form.module.css";

const NicknameEditForm = ({ onClose }: { onClose: () => void }) => {
  const [isError, setisError] = useState(false);

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={style["form-container"]}>
          <div className={style.title}>닉네임 수정</div>
          <form className={style.form}>
            <input
              className={`${style.input}  ${isError ? style.err : ""}`}
              type="text"
            />
            <div className={style.message}>
              <span>최대 10자</span>
              {isError && <span>에러 메세지</span>}
            </div>
            <div className={style["button-wrapper"]}>
              <button className={style.close} onClick={onClose}>
                취소
              </button>
              <button className={style.submit}>수정</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NicknameEditForm;
