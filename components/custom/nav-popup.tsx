import React from "react";
import style from "styles/custom/nav-popup.module.css";
import Link from "next/link";
const NavPopUp = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={style["box-wrapper"]}>
      <div>
        <Link href="/upload/embed">
          <a>
            <div onClick={onClose} className={style.button}>
              임베드 영상 업로드
            </div>
          </a>
        </Link>
        <Link href="/upload/direct">
          <a>
            <div
              className={`${style.button} ${style["border-top"]}`}
              onClick={onClose}
            >
              직접 영상 업로드
            </div>
          </a>
        </Link>
        <div
          className={`${style.button} ${style["border-top"]}`}
          onClick={onClose}
        >
          취소
        </div>
      </div>
    </div>
  );
};

export default NavPopUp;
