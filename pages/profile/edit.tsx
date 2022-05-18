import { NextPageWithLayout } from "types/common";
import style from "styles/edit.module.css";
import headerStyle from "styles/upload/direct.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import NicknameEditForm from "components/custom/nickname-edit-form";
import AlertModal from "components/custom/alert-modal";
import useModal from "hooks/use-modal";
import EditIcon from "components/icons/edit";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { logOutAPI, withDrawAPI } from "apis/auth";
import Router from "next/router";
import useInput from "hooks/use-input";
import { imageResizeAPI, userUpdateAPI } from "apis/accounts";
import { useCheck } from "hooks/use-check";

const ProfileEdit: NextPageWithLayout = () => {
  const [editOpen, onEditClose, setIsOpen] = useModal("edit");
  const [alertOpen, onAlertClose, AlertHandler, alertType] = useModal("alert");

  const queryClient = useQueryClient();
  //const { data: user } = useQuery(QUERY_KEY.user.key, QUERY_KEY.user.api);
  const { checkModal } = useCheck();

  // const { data: user } = useQuery(QUERY_KEY.user.key, QUERY_KEY.user.api);

  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const isUser = checkModal();
    if (isUser) {
      setNickname(localStorage.getItem("nickname")!);
      setEmail(localStorage.getItem("email")!);
      setProfile(localStorage.getItem("profile")!);
    }
  }, []);
  const [nicknameValue, onChangeNickname] = useInput("");

  const inputRef = useRef<HTMLInputElement>(null);
  const imageUploadHandler = useCallback(() => {
    inputRef.current!.click();
  }, [inputRef.current]);

  const changeNickname = useCallback(() => {
    setNickname(nicknameValue);
    onEditClose();
  }, [nicknameValue]);

  const changeImage = useCallback((e: any) => {
    const Image = e.target.files;
    const imgaeFormData = new FormData();
    imgaeFormData.append("file", Image[0]);
    imgaeFormData.append("width", "72");
    imgaeFormData.append("height", "72");
    imgaeFormData.append("type", "profile");
    imageResizeAPI(imgaeFormData).then((response) => {
      setProfile(response.url);
    });
  }, []);

  const logoutMutation = useMutation<void, AxiosError>(logOutAPI, {
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      Router.replace("/");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("email");
      localStorage.removeItem("profile");
      localStorage.removeItem("nickname");
      queryClient.invalidateQueries();
      queryClient.setQueryData("user", "");
    },
  });

  const withdrawMutation = useMutation<void, AxiosError>(withDrawAPI, {
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      Router.replace("/");
    },
  });

  const updateMutaion = useMutation<
    void,
    AxiosError,
    { nickname: string; profile: string }
  >(userUpdateAPI, {
    onError: (error) => {
      alert(error.response?.data);
    },
  });

  const onLogOut = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const onWithdraw = useCallback(() => {
    withdrawMutation.mutate();
  }, [withdrawMutation]);

  const onUpdate = useCallback(() => {
    updateMutaion.mutate({ nickname, profile });
  }, [updateMutaion]);

  return (
    <div className={style.wrapper}>
      <div className={headerStyle.complete}>
        <span onClick={onUpdate}>완료</span>
      </div>
      <section className={style["img-section"]}>
        {profile !== "null" ? (
          <img src={`${profile}`} style={{ width: "72px", height: "72px" }} />
        ) : (
          <Image src={ICONS.PAW} width={72} height={72} />
        )}
        <div onClick={imageUploadHandler} className={style["icon-wrapper"]}>
          <input
            ref={inputRef}
            name="file"
            type="file"
            onChange={changeImage}
            hidden
          />
          <EditIcon width={36} height={36} isGrey={true} />
        </div>
      </section>
      <section className={style["info-section"]}>
        <div className={style["info-title"]}>기본 정보</div>
        <div className={`${style.box} ${style.first}`}>
          <span className={style["info-font"]}>연결된 이메일</span>
          <div>{email}</div>
        </div>
        <div className={`${style.box} `}>
          <div className={style.nickname}>
            <div>
              <span className={style["info-font"]}>닉네임</span>
              <div>{nickname}</div>
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
      {editOpen && (
        <NicknameEditForm
          onClose={onEditClose}
          onClick={changeNickname}
          onChange={onChangeNickname}
          nickname={nicknameValue}
        />
      )}
      {alertOpen && (
        <AlertModal
          alertType={alertType!}
          onClose={onAlertClose}
          onLogOut={onLogOut}
          onWithDraw={onWithdraw}
        />
      )}
    </div>
  );
};

ProfileEdit.header = { title: "마이 페이지" };
ProfileEdit.back = { color: "gray" };

export default ProfileEdit;
