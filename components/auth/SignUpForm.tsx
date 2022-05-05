import CustomInput from "components/customInput";
import useInput from "hooks/useInput";
import React, { useCallback, useEffect, useState } from "react";
import style from "styles/signup.module.css";

const SignUpForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordChk, setPasswordChk] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [buttonColor, setButtonColor] = useState(false);

  const onChangePasswordChk = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordChk(e.target.value);
      setPasswordError(e.target.value !== password);
      setPasswordSuccess(e.target.value === password);
    },
    []
  );
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log('회원가입 클릭');
      e.preventDefault();
    },
    [email, password, nickname]
  );

  useEffect(() => {
    if (passwordChk !== "" && password === passwordChk) {
      setPasswordError(false);
      setPasswordSuccess(true);
    } else if (passwordChk === "") {
      setPasswordError(false);
      setPasswordSuccess(false);
    }
  }, [password, passwordChk]);

  useEffect(() => {
    if (passwordSuccess && nickname !== "" && email !== "") {
      setButtonColor(true);
    } else {
      setButtonColor(false);
    }
  }, [passwordSuccess, nickname, email]);

  return (
    <>
      <form>
        <div>
          <CustomInput
            width={343}
            height={52}
            inputType="email"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <CustomInput
            width={343}
            height={52}
            inputType="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <CustomInput
            width={343}
            height={52}
            inputType="passwordChk"
            value={passwordChk}
            onChange={onChangePasswordChk}
            isError={passwordError}
            isSuccess={passwordSuccess}
          />
        </div>
        <div>
          <CustomInput
            width={343}
            height={52}
            inputType="nickname"
            value={nickname}
            onChange={onChangeNickname}
          />
        </div>
        <button
          className={`${style.button} ${
            buttonColor ? style.color : style.grey
          } `}
          type="submit"
          onClick={onSubmit}
          disabled={!buttonColor}
        >
          회원가입 하기
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
