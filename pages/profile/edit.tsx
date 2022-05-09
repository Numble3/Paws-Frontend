import { NextPageWithLayout } from "types/common";
import style from "styles/edit.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import NicknameEditForm from "components/nicknameEditForm";
import AlertModal from "components/alertModal";

const ProfileEdit: NextPageWithLayout = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("");

  const onClose = useCallback(() => {
    setEditOpen(false);
  }, []);
  
  const onAlertClose = useCallback(() => {
    setAlertOpen(false);
  }, []);

  const AlertHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setAlertType((e.target as HTMLDivElement).id);
    setAlertOpen(true);
  }, []);

  return (
    <div className={style.wrapper}>
      <section className={style["img-section"]}>
        <Image src={ICONS.PAW} width={72} height={72} />
        <div className={style["icon-wrapper"]}>
          <Image src={ICONS.EDIT} width={36} height={36} />
        </div>
      </section>
      <section className={style["info-section"]}>
        <div className={style["info-title"]}>기본 정보</div>
        <div className={`${style.box} ${style.first}`}>
          <span className={style["info-font"]}>연결된 이메일</span>
          <div>sampleEmail@naver.com</div>
        </div>
        <div className={`${style.box} `}>
          <div className={style.nickname}>
            <div>
              <span className={style["info-font"]}>닉네임</span>
              <div>sampleNickname</div>
            </div>
            <div onClick={() => setEditOpen(true)}>
              <Image src={ICONS.EDIT} width={20} height={20} />
            </div>
          </div>
        </div>
      </section>
      <section className={style["info-section"]}>
        <div className={style["info-title"]}>계정</div>
        <div
          id="logout"
          onClick={AlertHandler}
          className={`${style.box} ${style.first} ${style["account-font"]}`}
        >
          로그아웃
        </div>
        <div
          id="withdraw"
          onClick={AlertHandler}
          className={`${style.box} ${style["account-font"]}`}
        >
          탈퇴
        </div>
      </section>
      {editOpen && <NicknameEditForm onClose={onClose} />}
      {alertOpen && <AlertModal alertType={alertType} onClose={onAlertClose} />}
    </div>
  );
};

ProfileEdit.header = { title: "마이 페이지" };

export default ProfileEdit;
