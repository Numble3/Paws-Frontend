import { signUpAPI } from "apis/auth";
import { CustomInput } from "components/custom";
import useInput from "hooks/use-input";
import Router from "next/router";
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import style from "styles/signup.module.css";

const SignUpForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const [passwordChk, setPasswordChk] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (emailError) {
      setTimeout(() => {
        setEmailError(false);
      }, 2000);
    }
    if (nicknameError) {
      setTimeout(() => {
        setNicknameError(false);
      }, 2000);
    }
  }, [emailError, nicknameError]);

  const onSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoading(true);
      signUpAPI({ email, nickname, password })
        .then(() => {
          Router.replace("/login");
        })
        .catch((error) => {
          error.response;
          if (error.response.status === 409) {
            if (error.response.data.message === "이미 존재하는 이메일입니다.") {
              setEmailError(true);
              setErrorMessage(error.response.data.message);
            } else {
              setNicknameError(true);
              setErrorMessage(error.response.data.message);
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
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
          error={{
            isError: emailError,
            message: errorMessage,
          }}
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
          error={{
            isError: passwordError,
            message: "비밀번호가 일치하지 않습니다.",
          }}
          placeHolderMessage="비밀 번호 확인"
          isSuccess={!passwordError && passwordChk !== ""}
        />
        <CustomInput
          inputType="text"
          value={nickname}
          onChange={onChangeNickname}
          placeHolderMessage="닉네임 입력"
          error={{
            isError: nicknameError,
            message: errorMessage,
          }}
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
            passwordError || nickname == "" || email == "" || passwordChk == ""
          }
        >
          회원가입 하기
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
