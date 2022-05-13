import { NextPageWithLayout } from "types/common";
import style from "styles/edit.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import NicknameEditForm from "components/custom/nickname-edit-form";
import AlertModal from "components/custom/alert-modal";
import useModal from "hooks/use-modal";
import EditIcon from "components/icons/edit";
import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { logOutAPI, withDrawAPI } from 'apis/auth';
import Router from 'next/router';

const ProfileEdit: NextPageWithLayout = () => {
  const [editOpen, onEditClose, setIsOpen] = useModal("edit");
  const [alertOpen, onAlertClose, AlertHandler, alertType] = useModal("alert");

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const logoutMutation = useMutation<void, AxiosError>(logOutAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      queryClient.setQueryData('user', null);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      Router.replace("/");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const withdrawMutation = useMutation<void, AxiosError>(withDrawAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      Router.replace("/");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onLogOut = useCallback(() => {
    console.log('logout mutate');
    logoutMutation.mutate();
  }, [logoutMutation]);

  const onWithdraw = useCallback(() => {
    console.log('withdraw mutate');
    withdrawMutation.mutate();
  }, [withdrawMutation]);

  return (
    <div className={style.wrapper}>
      <section className={style["img-section"]}>
        <Image src={ICONS.PAW} width={72} height={72} />
        <div className={style["icon-wrapper"]}>
          <EditIcon width={36} height={36} isGrey={true} />
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
              <EditIcon width={20} height={20} isGrey={false} />
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
        <AlertModal alertType={alertType!} onClose={onAlertClose} onLogOut={onLogOut} onWithDraw={onWithdraw} />
      )}
    </div>
  );
};

ProfileEdit.header = { title: "마이 페이지" };
ProfileEdit.back = { color: "gray" };

export default ProfileEdit;
