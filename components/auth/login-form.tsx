import { getUserInfoAPI, logInAPI } from 'apis/auth';
import { AxiosError } from 'axios';
import { CustomInput } from "components/custom";
import useInput from "hooks/use-input";
import Link from "next/link";
import React, { MouseEvent, useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
      const {data} = useQuery<User>('user', getUserInfoAPI);
      console.log("getUserAPI 잘 들어오는지 확인 : ", data);
      queryClient.setQueryData('user', data);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(email, password);
    mutation.mutate({ email, password });
  }, [email, password, mutation]);
  

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
        <div>SNS로 로그인 하기</div>
        <div className={style.logo_container}>
          <div className={style.logo}>logo</div>
          <div className={style.logo}>logo</div>
          <div className={style.logo}>logo</div>
        </div>
      </section>
      <section className={style.signup_section}>
        <span>회원이 아니신가요? </span>
        <Link href="/sign_up">
          <a className={style.signup}>회원가입</a>
        </Link>
      </section>
    </>
  );
};

export default LoginForm;
