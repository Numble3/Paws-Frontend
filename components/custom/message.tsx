import { CautionIcon, SuccessIcon } from "components/icons";
import style from "styles/custom/message.module.css";

const CustomMessage = ({
  isError,
  ErrorMessage="오류가 발생했어요 :(",
  SuccessMessage="저장이 완료되었어요!",
}: {
  isError: boolean;
  ErrorMessage?: string;
  SuccessMessage?: string;
}) => {
  const err = false;
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <div className={`${style.box} ${isError ? style.err : ""}`}>
          <div className={style.icon}>
            {err ? (
              <CautionIcon width={12} height={12} fill="#ffffff" />
            ) : (
              <SuccessIcon width={12} height={12} fill="#ffffff" />
            )}
          </div>
          {isError ? ErrorMessage : SuccessMessage}
        </div>
      </div>
    </div>
  );
};

export default CustomMessage;
