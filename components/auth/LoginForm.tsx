import Link from 'next/link';
import React from "react";
import style from "styles/loginform.module.css";

const LoginForm = () => {
  return (
    <>
      <form>
        <section>
          <input
            className={style.input}
            placeholder="이메일 입력"
            type="text"
          />
        </section>
        <section>
          <input
            className={style.input}
            placeholder="비밀번호 입력"
            type="password"
          />
        </section>
        <button className={style.button} type="submit">
          로그인
        </button>
      </form>
      <section className={style.Oauth}>
        <div>SNS로 로그인 하기</div>
        <div className={style.logoContainer}>
          <div className={style.logo}>logo</div>
          <div className={style.logo}>logo</div>
          <div className={style.logo}>logo</div>
        </div>
      </section>
      <section className={style.signUpSection}>
        <span>회원이 아니신가요? </span>
        <Link href="/signUp">
          <a className={style.signUp} >회원가입</a>
        </Link>
      </section>
    </>
  );
};

export default LoginForm;
