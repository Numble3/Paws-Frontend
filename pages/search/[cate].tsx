import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Image from "next/image";
import { IMAGES } from "lib/assets";
import styles from "styles/search/cate.module.css";
import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import BackIcon from "components/icons/back";
import InfiniteScroll from "components/custom/infinite-scroll";
import { getVideos } from "apis/get-video";
import { VideoParams } from "types/video";

const noCateResult = {
  title: "카테고리 영상 없음",
  content: "아직 등록된 동영상이 없어요",
};

const Category: NextPageWithLayout = () => {
  const router = useRouter();
  const { cate } = router.query;
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
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

  const query: VideoParams = {
    category: cate as string,
    page: 0,
    size: 10,
    sortCondition: selectedCategory,
  };

  return (
    <>
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
      <div className={styles.select_container}>
        <SelectBox setSelectedCategory={setSelectedCategory} />
      </div>
      <section className={styles.thumbnail_container}>
        <ul className={styles.thumbnail_row}>
          <InfiniteScroll
            noResult={noCateResult}
            query={query}
            fetchFunc={getVideos}
          />
        </ul>
      </section>
    </>
  );
};
Category.header = undefined;

export default Category;
