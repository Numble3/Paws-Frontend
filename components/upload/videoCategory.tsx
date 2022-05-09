import { useState } from "react";
import styles from "styles/upload/videoCategory.module.css";

const VideoCategory = () => {
  const category = [
    "강아지",
    "고양이",
    "토끼",
    "햄스터",
    "새",
    "도마뱀",
    "기타",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className={styles.category}>
      <p className={styles.title}>
        카테고리 <span>중복 선택 불가</span>
      </p>
      <ul>
        {category.map((name) => (
          <li
            className={
              selectedCategory === name
                ? styles.category__selected
                : styles.category__not_selected
            }
            onClick={() => setSelectedCategory(name)}
            key={name}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoCategory;
