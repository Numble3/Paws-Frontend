import { CautionIcon } from "components/icons";
import { ICONS } from "lib/assets";
import Image from "next/image";
import { ChangeEvent, useMemo } from "react";
import style from "styles/custom/custom-input.module.css";
import textarea from "styles/upload/embed.module.css";

interface Props {
  maxLength?: number;
  value?: string;
  width?: number | string;
  height?: number;
  error?: { isError: boolean; message: string };
  placeHolderMessage?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextArea = ({
  maxLength = 300,
  value,
  width = "100%",
  height = 52,
  error,
  placeHolderMessage,
  onChange,
}: Props) => {
  const iconPosition = useMemo(
    () => ({
      transform: `translate(-20px,${(height - 20) / 2}px)`,
    }),
    []
  );

  return (
    <div className={`${style.container} ${textarea.description}`}>
      {error?.isError && <label className={style.label}>{error.message}</label>}
      <textarea
        maxLength={maxLength}
        style={{ width: width, height: height }}
        placeholder={placeHolderMessage}
        className={`${style.input} ${error?.isError ? style.err : ""}`}
        value={value}
        onChange={onChange}
      />
      {/* {error?.isError && (
        <div style={iconPosition} className={style.icon}>
          <CautionIcon width={20} height={20} fill="#E95733" />
        </div>
      )} */}
    </div>
  );
};

export default CustomTextArea;
