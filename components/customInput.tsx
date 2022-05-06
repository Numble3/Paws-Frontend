import { ICONS } from 'lib/assets';
import { getInputData } from "lib/customInput";
import Image from 'next/image';
import { useMemo } from "react";
import style from 'styles/customInput.module.css';

interface Props {
  inputType: string;
  value: string;
  width: number;
  height: number;
  isError?: boolean;
  isSuccess?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  inputType,
  value,
  width,
  height,
  isError,
  isSuccess,
  onChange
}: Props) => {
  const { errorMessage, placeHolderMessage, customType } =
    getInputData(inputType);

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
        type={customType}
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
