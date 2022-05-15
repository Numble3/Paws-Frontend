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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { logOutAPI, withDrawAPI } from "apis/auth";
import Router, { useRouter } from "next/router";
import useInput from "hooks/use-input";
import { imageResizeAPI, userUpdateAPI } from "apis/accounts";
import { QUERY_KEY } from "lib/query-key";
import { useDispatch } from 'react-redux';
import modalSlice from 'reducers/modal';

const ProfileEdit: NextPageWithLayout = () => {
  const [editOpen, onEditClose, setIsOpen] = useModal("edit");
  const [alertOpen, onAlertClose, AlertHandler, alertType] = useModal("alert");

  const queryClient = useQueryClient();
  const { data: user } = useQuery(QUERY_KEY.user.key, QUERY_KEY.user.api);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      router.replace("/");
      dispatch(modalSlice.actions.isError({ isError: true }));
      dispatch(modalSlice.actions.open({}));
      dispatch(modalSlice.actions.setErrorMessage({errorMessage: "로그인이 필요합니다."}));
      setTimeout(() => {
        dispatch(modalSlice.actions.close({}));
      }, 3000);
    }
    setNickname(sessionStorage.getItem("nickname")!);
    setEmail(sessionStorage.getItem("email")!);
    setProfile(sessionStorage.getItem("profile")!);
  }, []);
  const [nicknameValue, onChangeNickname] = useInput("");

  const inputRef = useRef<HTMLInputElement>(null);
  const imageUploadHandler = useCallback(() => {
    inputRef.current!.click();
  }, [inputRef.current]);

  const changeNickname = useCallback(() => {
    setNickname(nicknameValue);
    console.log(nickname);
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
      console.log("resize result : ", response);
      setProfile(response.url);
    });
  }, []);

  const logoutMutation = useMutation<void, AxiosError>(logOutAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      Router.replace("/");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("profile");
      sessionStorage.removeItem("nickname");
      queryClient.invalidateQueries();
      queryClient.setQueryData("user", "");
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

  const updateMutaion = useMutation<
    void,
    AxiosError,
    { nickname: string; profile: string }
  >(userUpdateAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      console.log("suucess");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onLogOut = useCallback(() => {
    console.log("logout mutate");
    logoutMutation.mutate();
  }, [logoutMutation]);

  const onWithdraw = useCallback(() => {
    console.log("withdraw mutate");
    withdrawMutation.mutate();
  }, [withdrawMutation]);

  const onUpdate = useCallback(() => {
    console.log("update mutate");
    updateMutaion.mutate({ nickname, profile });
  }, [updateMutaion]);
  console.log("proflie", profile);

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
