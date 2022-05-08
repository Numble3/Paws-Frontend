import { ICONS } from 'lib/assets';
import Image from 'next/image';
import { ChangeEvent, useMemo } from "react";
import style from 'styles/customInput.module.css';

interface Props {
  inputType: string;
  value: string;
  width?: number;
  height?: number;
  isError?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
  placeHolderMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  inputType,
  value,
  width=343,
  height=52,
  isError,
  isSuccess,
  errorMessage,
  placeHolderMessage,
  onChange
}: Props) => {

  const iconPosition = useMemo(
    () => ({
      transform: `translate(${width - 40}px,-${20 + (height - 20) / 2}px)`,
    }),
    []
  );

  return (
    <div className={style.container}>
      {isError && <label className={style.label}>{errorMessage}</label>}
      <input
        style={{ width: width, height: height }}
        placeholder={placeHolderMessage}
        className={`${style.input} ${isError ? style.err : ""}`}
        type={inputType}
        value={value}
        onChange={onChange}
      />
      {isError && (
        <div style={iconPosition} className={style.icon}>
          <Image src={ICONS.CAUTION} width={20} height={20}/>
        </div>
      )}
      {isSuccess && (
        <div style={iconPosition} className={style.icon}>
          <Image src={ICONS.SUCCESS} width={20} height={20}/>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
