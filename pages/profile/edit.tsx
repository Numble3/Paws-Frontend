import { NextPageWithLayout } from "types/common";
import style from "styles/edit.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import NicknameEditForm from "components/nicknameEditForm";
import AlertModal from "components/alertModal";
import useModal from "hooks/useModal";
import EditIcon from "components/icons/edit";

const ProfileEdit: NextPageWithLayout = () => {
  const [editOpen, onEditClose, setIsOpen] = useModal("edit");
  const [alertOpen, onAlertClose, AlertHandler, alertType] = useModal("alert");

  return (
    <div className={style.wrapper}>
      <section className={style["img-section"]}>
        <Image src={ICONS.PAW} width={72} height={72} />
        <div className={style["icon-wrapper"]}>
          <EditIcon width={36} height={36} />
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
            <div onClick={() => setIsOpen(true)}>
              <EditIcon width={20} height={20} color={true} />
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
      {editOpen && <NicknameEditForm onClose={onEditClose} />}
      {alertOpen && (
        <AlertModal alertType={alertType!} onClose={onAlertClose} />
      )}
    </div>
  );
};

ProfileEdit.header = { title: "마이 페이지" };

export default ProfileEdit;
