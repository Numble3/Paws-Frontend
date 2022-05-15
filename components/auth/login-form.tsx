import { getUserInfoAPI, logInAPI } from "apis/auth";
import client from "apis/client";
import { AxiosError } from "axios";
import { CustomInput } from "components/custom";
import CustomMessage from "components/custom/message";
import useInput from "hooks/use-input";
import useMessage from "hooks/use-message";
import { ICONS } from "lib/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEvent, useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "reducers";
import modalSlice from "reducers/modal";
import style from "styles/loginform.module.css";
type User = {
  email: string;
  profile: string;
  nickanme: string;
};

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation<
    { accessToken: string; refreshToken: string },
    AxiosError,
    { email: string; password: string }
  >("login", logInAPI, {
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      console.error(error);
      alert(error.response?.data);
    },
    onSuccess: (token) => {
      console.log("access token 들어오는지 확인 : ", token);
      const { accessToken } = token;
      const { refreshToken } = token;
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      getUserInfoAPI()
        .then((data) => {
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("profile", data.profile);
          sessionStorage.setItem("nickname", data.nickname);
          queryClient.setQueryData("user", data);
        })
        .catch((error) => {
          console.error(error);
          alert(error.response?.data);
        });
      router.replace("/");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      mutation.mutate({ email, password });
    },
    [email, password, mutation]
  );


  return (
    <>
      <form>
        <CustomInput
          inputType="text"
          value={email}
          onChange={onChangeEmail}
          placeHolderMessage="이메일 입력"
        />
        <CustomInput
          inputType="password"
          value={password}
          onChange={onChangePassword}
          placeHolderMessage="비밀 번호 입력"
        />
        <button onClick={onSubmit} className={style.button} type="submit">
          로그인
        </button>
      </form>
      <section className={style.Oauth}>
        <div className={style.sns}>
          <span>SNS로 로그인 하기</span>
        </div>
        <div className={style.logo_container}>
          <div className={style.logo}>
            <Image src={ICONS.GOOGLE} width={22} height={22} />
          </div>
          <div className={style.logo}>
            <Image src={ICONS.NAVER} width={28} height={28} />
          </div>
          <div className={style.logo}>
            <Image src={ICONS.KAKAO} width={28} height={28} />
          </div>
        </div>
      </section>
      <section className={style.signup_section}>
        <span>회원이 아니신가요? </span>
        <Link href="/sign-up">
          <a className={style.signup}>회원가입</a>
        </Link>
      </section>
    </>
  );
};

export default LoginForm;
