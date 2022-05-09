import { useState } from "react";
import styles from "styles/selectBox.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";

const SelectBox = () => {
  const [selectedValue, setSelectedValue] = useState("최신순");
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectBox = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div className={styles.select} onClick={() => setIsSelected(!isSelected)}>
      <div className={isSelected ? styles.selected_focused : styles.selected}>
        <div>{selectedValue}</div>
        <Image src={ICONS.DOWN_ARROW} width={12} height={12} />
      </div>
      {isSelected && (
        <ul>
          <li
            onClick={() => handleSelectBox("최신순")}
            className={styles.option}
          >
            최신순
            {selectedValue === "최신순" ? (
              <Image src={ICONS.ACTIVE} width={4} height={4} />
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => handleSelectBox("인기순")}
            className={styles.option}
          >
            인기순
            {selectedValue === "인기순" && (
              <Image src={ICONS.ACTIVE} width={4} height={4} />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
