import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import modalSlice from "reducers/modal";

/** 사용자 유효성 체크 */
export const useCheck = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const checkModal = (toHome = true) => {
    const email = localStorage.getItem("email");
    if (!email) {
      toHome && router.replace("/");

      dispatch(modalSlice.actions.isError({ isError: true }));
      dispatch(modalSlice.actions.open({}));
      dispatch(
        modalSlice.actions.setErrorMessage({
          errorMessage: "로그인이 필요합니다.",
        })
      );
      setTimeout(() => {
        dispatch(modalSlice.actions.close({}));
      }, 3000);
      return false;
    }
    return true;
  };

  return { router, checkModal };
};
