import { Dispatch, SetStateAction, useState } from "react";
import styles from "styles/custom/selectBox.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";

type SelectType = {
  value: string;
  desc: string;
};

interface Props {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const selectOption = [
  { value: "LATEST", desc: "최신순" },
  { value: "POPULARITY", desc: "인기순" },
];

const SelectBox = ({ setSelectedCategory }: Props) => {
  const [selectedValue, setSelectedValue] = useState(selectOption[0]);
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectBox = ({ value, desc }: SelectType) => {
    setSelectedValue({ value, desc });
    setSelectedCategory(value);
  };
  return (
    <div className={styles.select} onClick={() => setIsSelected(!isSelected)}>
      <div className={isSelected ? styles.selected_focused : styles.selected}>
        <div>{selectedValue.desc}</div>
        <Image src={ICONS.DOWN_ARROW} width={12} height={12} />
      </div>
      {isSelected && (
        <ul>
          <li
            onClick={() => handleSelectBox(selectOption[0])}
            className={styles.option}
          >
            최신순
            {selectedValue.desc === selectOption[0].desc ? (
              <Image src={ICONS.ACTIVE} width={4} height={4} />
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => handleSelectBox(selectOption[1])}
            className={styles.option}
          >
            인기순
            {selectedValue.desc === selectOption[1].desc && (
              <Image src={ICONS.ACTIVE} width={4} height={4} />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
