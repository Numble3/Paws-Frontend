import { CautionIcon } from "components/icons";
import { ICONS } from "lib/assets";
import Image from "next/image";
import { ChangeEvent, useMemo } from "react";
import style from "styles/custom/custom-input.module.css";

interface Props {
  inputType: string;
  value?: string;
  width?: number | string;
  height?: number;
  isSuccess?: boolean;
  error?: { isError: boolean; message: string };
  placeHolderMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  inputType,
  value,
  width = "100%",
  height = 52,
  isSuccess,
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
    <div className={style.container}>
      {error?.isError && <label className={style.label}>{error.message}</label>}
      <input
        style={{ width: width, height: height }}
        placeholder={placeHolderMessage}
        className={`${style.input} ${error?.isError ? style.err : ""}`}
        type={inputType}
        value={value}
        onChange={onChange}
      />
      {error?.isError && (
        <div style={iconPosition} className={style.icon}>
          <CautionIcon width={20} height={20} fill="#E95733" />
        </div>
      )}
      {isSuccess && (
        <div style={iconPosition} className={style.icon}>
          <Image src={ICONS.SUCCESS} width={20} height={20} />
        </div>
      )}
    </div>
  );
};

export default CustomInput;
