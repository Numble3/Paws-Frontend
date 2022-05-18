import { useState } from "react";
import styles from "styles/search/cate.module.css";
import SelectBox from "components/custom/select-box";
import InfiniteScroll from "components/custom/infinite-scroll";
import { getVideos } from "apis/get-video";
import { VideoParams } from "types/video";
import CateHeader from "components/search/cate-header";
import { GetServerSideProps } from "next";

const noCateResult = {
  title: "카테고리 영상 없음",
  content: "아직 등록된 동영상이 없어요",
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { cate } = query;
  return {
    props: {
      cate,
    },
  };
};

const Category = ({ cate }: { cate: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");

  const query: VideoParams = {
    category: cate as string,
    page: 0,
    size: 10,
    sort: selectedCategory,
  };

  return (
    <>
      <CateHeader cate={cate} />
      <div className={styles.select_container}>
        <SelectBox setSelectedCategory={setSelectedCategory} />
      </div>
      <section className={styles.thumbnail_container}>
        <ul className={styles.thumbnail_row}>
          <InfiniteScroll
            noResult={noCateResult}
            query={query}
            fetchFunc={getVideos}
            selectedCategory={selectedCategory}
          />
        </ul>
      </section>
    </>
  );
};

export default Category;
