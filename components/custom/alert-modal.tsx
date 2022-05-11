import React, { ReactNode } from "react";
import editStyle from "styles/edit-form.module.css";
import style from "styles/custom/alert.module.css";
import CautionIcon from '../icons/caution';
import TrashIcon from '../icons/trash';
import Image from 'next/image';
import { ICONS } from 'lib/assets';

interface Props {
  alertType: string;
  onClose: () => void;
}

const variable: {
  message: string;
  type: string;
  icon: ReactNode;
} = {
  message: "",
  type: "",
  icon: null,
};

const WITH_DRAW_MESSAGE =
 `삭제 이후 해당 영상 관련 모든 정보가 폐기되며,
 모든 데이터는 복구가 불가능 합니다.`;
const LOG_OUT_MESSAGE =
  `'paws'앱에서 로그아웃 합니다.
  로그 아웃 후 혜당 계정으로 재로그인이 가능합니다.`;
const DELETE_MESSAGE =
  `회원 탈퇴 이후 회원 정보는 모두 삭제 되며,
  모든 데이터는 복구가 불가능합니다.`;

const AlertModal = ({ alertType, onClose }: Props) => {

  if(alertType === "logout"){
    variable.type = "로그아웃";
    variable.message = LOG_OUT_MESSAGE;
    variable.icon = <Image src={ICONS.LOGOUT} width={44} height={44} />
  }else if(alertType === "withdraw"){
    variable.type = "탈퇴";
    variable.message = WITH_DRAW_MESSAGE;
    variable.icon = <CautionIcon width={44} height={44} fill="#F08970" />;
  }else{
    variable.type = "삭제";
    variable.message = DELETE_MESSAGE;
    variable.icon = <TrashIcon/>;
  }

  return (
    <div className={editStyle.background}>
      <div className={editStyle.wrapper}>
        <div className={`${editStyle["form-container"]} ${style.form}`}>
          <div className={style.img}>
            {variable.icon}
          </div>
          <div className={style.title}>
            {alertType === "video"
              ? "영상을 삭제 하시겠어요?"
              : `정말 ${variable.type} 하시겠어요?`}
          </div>
          <pre>{variable.message}</pre>
          <div className={style["button-wrapper"]}>
            <button>네, {variable.type} 할래요</button>
            <button onClick={onClose}>
              아뇨!{" "}
              {alertType === "video"
                ? "남겨 놓을래요"
                : "다시 동영상보러 갈래요"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
