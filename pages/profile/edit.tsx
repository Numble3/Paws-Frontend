import { NextPageWithLayout } from "types/common";
import style from "styles/edit.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { useCallback, useMemo, useState } from 'react';
import NicknameEditForm from 'components/nicknameEditForm';

const ProfileEdit: NextPageWithLayout = () => {

  const [editOpen, setEditOpen] = useState(false);

  const onClose = useCallback(() => {
    setEditOpen(false);
  }, []);

  const font =  useMemo(
    () => ({
  fontWeight: 500,
  fontSize: 12,
  color: "#373737",
    }),
    []
  );

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
          <span>연결된 이메일</span>
          <div>sampleEmail@naver.com</div>
        </div>
        <div className={`${style.box} `}>
          <div className={style.nickname}>
            <div>
              <span>닉네임</span>
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
        <div style={font} className={`${style.box} ${style.first}`}>
          로그아웃
        </div>
        <div style={font} className={style.box} >
          탈퇴
        </div>
      </section>
      {editOpen && <NicknameEditForm onClose={onClose} />}
    </div>
  );
};

ProfileEdit.header = { title: "마이 페이지" };

export default ProfileEdit;
