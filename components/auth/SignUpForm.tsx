import React from "react";
import style from "styles/signup.module.css";

const SignUpForm = () => {
  return (
    <>
      <form>
        <div>
          <input className={style.input} placeholder="닉네임 입력" type="text" />
        </div>
        <div>
          <input className={style.input} placeholder="이메일 입력" type="text" />
        </div>
        <div>
          <input className={style.input} placeholder="비밀번호 입력" type="password" />
        </div>
        <button className={style.button} type='submit'>회원가입 하기</button>
      </form>
    </>
  );
};

export default SignUpForm;
