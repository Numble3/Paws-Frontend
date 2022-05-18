import { Dispatch, SetStateAction } from "react";
import styles from "styles/upload/videoCategory.module.css";

interface Props {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  isError?: boolean;
}

const VideoCategory = ({
  selectedCategory,
  setSelectedCategory,
  isError = false,
}: Props) => {
  const category = [
    { name: "강아지", val: "DOG" },
    { name: "고양이", val: "CAT" },
    { name: "토끼", val: "RABBIT" },
    { name: "햄스터", val: "HAMSTER" },
    { name: "새", val: "BIRD" },
    { name: "도마뱀", val: "LIZARD" },
    { name: "기타", val: "OTHERS" },
  ];
  return (
    <div className={styles.category}>
      <p className={styles.title}>
        카테고리 <span>중복 선택 불가</span>
        {isError && (
          <span className={styles.error}>카테고리를 입력해주세요.</span>
        )}
      </p>
      <ul>
        {category.map((v, i) => (
          <li
            className={`${styles.category__not_selected}
              ${selectedCategory === v.val ? styles[`category__${v.val}`] : ""} 
            `}
            onClick={() => setSelectedCategory(v.val)}
            key={i}
          >
            {v.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoCategory;
