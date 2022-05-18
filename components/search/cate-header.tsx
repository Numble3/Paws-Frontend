import React, { memo, useMemo } from "react";
import BackIcon from "components/icons/back";
import { IMAGES } from "lib/assets";
import Image from "next/image";
import styles from "styles/search/cate-header.module.css";
import { useRouter } from "next/router";

const CateHeader = ({ cate }: { cate: string }) => {
  const router = useRouter();
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
          width: 150,
          height: 90,
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
      cate === "hamster" ||
      cate === "etc"
    )
      return true;
  }, [cate]);

  return (
    <header className={`${styles[`cate_${cate}`]} ${styles.header}`}>
      <div onClick={() => router.back()}>
        <BackIcon isGray={false} />
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
  );
};

export default memo(CateHeader);
