import { CustomInput } from "components/custom";
import useInput from "hooks/useInput";
import Link from "next/link";
import React from "react";
import style from "styles/loginform.module.css";

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
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
        <button className={style.button} type="submit">
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
