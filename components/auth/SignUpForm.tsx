import CustomInput from "components/customInput";
import useInput from "hooks/useInput";
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import style from "styles/signup.module.css";

const SignUpForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordChk, setPasswordChk] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordChk = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordChk(e.target.value);
      setPasswordError(e.target.value !== password);
      if (e.target.value === "") {
        setPasswordError(false);
      }
    },
    [passwordChk]
  );

  const onSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      console.log("회원가입 클릭");
      e.preventDefault();
    },
    [email, password, nickname]
  );

  return (
    <>
      <form>
        <CustomInput
          inputType="text"
          value={email}
          onChange={onChangeEmail}
          placeHolderMessage="이메일 입력"
          errorMessage="중복된 이메일 입니다."
        />
        <CustomInput
          inputType="password"
          value={password}
          onChange={onChangePassword}
          placeHolderMessage="비밀 번호 입력"
        />
        <CustomInput
          inputType="password"
          value={passwordChk}
          onChange={onChangePasswordChk}
          isError={passwordError}
          isSuccess={!passwordError && passwordChk !== ""}
          placeHolderMessage="비밀 번호 확인"
          errorMessage="비밀 번호가 일치하지 않습니다."
        />
        <CustomInput
          inputType="text"
          value={nickname}
          onChange={onChangeNickname}
          errorMessage="중복된 닉네임 입니다."
          placeHolderMessage="닉네임 입력"
        />
        <button
          className={`${style.button} ${
            !passwordError &&
            nickname !== "" &&
            email !== "" &&
            passwordChk !== ""
              ? style.color
              : style.grey
          } `}
          type="submit"
          onClick={onSubmit}
          disabled={
            !passwordError &&
            nickname !== "" &&
            email !== "" &&
            passwordChk !== ""
          }
        >
          회원가입 하기
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
