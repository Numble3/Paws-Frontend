export function getInputData(inputType: string) {
  let errorMessage!: string;
  let placeHolderMessage!: string;
  let customType!: string;
  if (inputType === "email") {
    errorMessage = "중복된 이메일 입니다.";
    placeHolderMessage = "이메일 입력";
    customType = "text";
  } else if (inputType === "password") {
    errorMessage = "";
    placeHolderMessage = "비밀 번호 입력";
    customType = "password";
  } else if (inputType === "passwordChk") {
    errorMessage = "비밀번호가 일치하지 않습니다.";
    placeHolderMessage = "비밀 번호 확인";
    customType = "password";
  } else if (inputType === "url") {
    errorMessage = "올바르지 않은 링크 입니다.";
    placeHolderMessage = "링크 주소를 입력해 주세요.";
    customType = "text";
  } else if (inputType === "nickname") {
    errorMessage = "중복된 닉네임 입니다.";
    placeHolderMessage = "닉네임 입력";
    customType = "text";
  } else {
    errorMessage = "";
    placeHolderMessage = "";
    customType = "text";
  }
  return { errorMessage, placeHolderMessage, customType };
}