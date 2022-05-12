import { getUserInfoAPI, logInAPI } from 'apis/auth';
import { AxiosError } from 'axios';
import { CustomInput } from "components/custom";
import useInput from "hooks/use-input";
import { ICONS } from 'lib/assets';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { MouseEvent, useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import modalSlice from 'reducers/modal';
import style from "styles/loginform.module.css";
type User = {
  email: string;
  profile: string;
  nickanme: string;
}

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  
  const queryClient = useQueryClient();
  const mutation = useMutation<string, AxiosError,{ email: string; password: string } >('login', logInAPI, {
    onMutate: () => {
      setIsLoading(true)
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: (token) => {
      console.log("access token 들어오는지 확인 : ", token);
      getUserInfoAPI()
        .then((data)=>{
          console.log(data);
        })
        .catch((error) => {
          alert(error.response?.data);
        })
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  }, [email, password, mutation]);

  const router = useRouter();
  const dispatch = useDispatch();

  const testHandler = () =>{
    dispatch(modalSlice.actions.isError({isError: false}));
    dispatch(modalSlice.actions.open({}));
    setTimeout(()=>{
      dispatch(modalSlice.actions.close({}));
    },3000);
    router.replace("/profile/my-upload");
  };

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
      <button onClick={testHandler}>test</button>
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
