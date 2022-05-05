import CustomInput from "components/customInput";
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
        <section>
          <CustomInput
            width={343}
            height={52}
            inputType="email"
            value={email}
            onChange={onChangeEmail}
          />
        </section>
        <section>
          <CustomInput
            width={343}
            height={52}
            inputType="password"
            value={password}
            onChange={onChangePassword}
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
          <a className={style.signUp}>회원가입</a>
        </Link>
      </section>
    </>
  );
};

export default LoginForm;
