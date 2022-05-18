import React from "react";
import { useState } from "react";
import styles from "styles/search/result-list.module.css";
import SelectBox from "components/custom/select-box";
import { getVideos } from "apis/get-video";
import InfiniteScroll from "components/custom/infinite-scroll";
import { VideoParams } from "types/video";

const noSearchResult = {
  title: "검색 결과 없음",
  content:
    "해당 키워드와 관련된 검색결과가 없어요.\n다른 검색어로 다시 시도해보세요!",
};

const ResultList = ({ search }: { search: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const query: VideoParams = {
    page: 0,
    size: 10,
    sort: selectedCategory,
    title: search as string,
  };
  return (
    <>
      <div className={styles.select_container}>
        <SelectBox setSelectedCategory={setSelectedCategory} />
      </div>
      <section className={styles.thumbnail_container}>
        <ul className={styles.thumbnail_row}>
          <InfiniteScroll
            noResult={noSearchResult}
            query={query}
            fetchFunc={getVideos}
            selectedCategory={selectedCategory}
          />
        </ul>
      </section>
    </>
  );
};

export default ResultList;
