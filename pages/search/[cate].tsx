import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import Image from "next/image";
import { ICONS, IMAGES } from "lib/assets";
import styles from "styles/search/cate.module.css";
import Thumbnail from "components/search/thumbnail";

const Category = () => {
  const router = useRouter();
  const { cate } = router.query;
  const [selectedValue, setSelectedValue] = useState("최신순");
  const [isSelected, setIsSelected] = useState(false);
  const handleSelectBox = (value: string) => {
    setSelectedValue(value);
  };
  const imageCate = cate ? (cate as string) : "";
  const changeName = (cate: string) => {
    switch (cate) {
      case "whole":
        return {
          name: "전체",
        };
      case "dog":
        return {
          name: "강아지",
          width: 115,
          height: 90,
        };
      case "cat":
        return {
          name: "고양이",
          width: 90,
          height: 120,
        };
      case "lizard":
        return {
          name: "도마뱀",
          width: 130,
          height: 80,
        };
      case "bird":
        return {
          name: "새",
          width: 100,
          height: 120,
        };
      case "rabbit":
        return {
          name: "토끼",
          width: 90,
          height: 110,
        };
      case "hamster":
        return {
          name: "햄스터",
          width: 80,
          height: 80,
        };
      case "etc":
        return {
          name: "기타",
          width: 90,
          height: 120,
        };
      default:
        return {
          name: "Not Found",
        };
    }
  };
  const cateObj = useMemo(() => changeName(imageCate), [cate]);
  const isImage = useMemo(() => {
    if (
      cate === "dog" ||
      cate === "cat" ||
      cate === "lizard" ||
      cate === "rabbit" ||
      cate === "bird" ||
      cate === "hamster"
    )
      return true;
  }, [cate]);

  return (
    <div className={styles.wrap}>
      <header className={`${styles[`cate_${cate}`]} ${styles.header}`}>
        <div>
          <Image
            onClick={() => router.back()}
            width={20}
            height={20}
            src={ICONS.BACK}
          />
        </div>
        {isImage ? (
          <div className={`${styles[`${cate}_container`]}`}>
            <Image
              width={`${cateObj.width}`}
              height={`${cateObj.height}`}
              src={IMAGES[imageCate.toUpperCase()]}
            />
          </div>
        ) : (
          <></>
        )}
        <span className={styles.cate_name}>{cateObj.name}</span>
      </header>
      <div className={styles.margin}>
        <div className={styles.select_container}>
          <div></div>
          <div
            className={styles.select}
            onClick={() => setIsSelected(!isSelected)}
          >
            <div
              className={isSelected ? styles.selected_focused : styles.selected}
            >
              <div>{selectedValue}</div>
              <Image src={ICONS.DOWN_ARROW} width={12} height={12} />
            </div>
            {isSelected ? (
              <ul>
                <li
                  onClick={() => handleSelectBox("최신순")}
                  className={styles.option}
                >
                  최신순{" "}
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
                  인기순{" "}
                  {selectedValue === "인기순" ? (
                    <Image src={ICONS.ACTIVE} width={4} height={4} />
                  ) : (
                    <></>
                  )}
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* 썸네일 임시 대체 */}
        <ul className={styles.thumbnail_row}>
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
        </ul>
      </div>
    </div>
  );
};

export default Category;
