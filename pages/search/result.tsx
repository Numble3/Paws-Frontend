import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import styles from "styles/search/result.module.css";
import { ICONS } from "lib/assets";
import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import BackIcon from "components/icons/back";
import { getVideos } from "apis/get-video";
import InfiniteScroll from "components/custom/infinite-scroll";
import { VideoParams } from "types/video";
import { GetServerSideProps } from "next";

const noSearchResult = {
  title: "검색 결과 없음",
  content:
    "해당 키워드와 관련된 검색결과가 없어요.\n다른 검색어로 다시 시도해보세요!",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { query: search } = query;
  return {
    props: {
      search,
    },
  };
};

const Result = ({ search }: { search: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const router = useRouter();
  const query: VideoParams = {
    page: 0,
    size: 10,
    sort: selectedCategory,
    title: search as string,
  };
  return (
    <>
      <section className={styles.header}>
        <div className={styles.back} onClick={() => router.back()}>
          <BackIcon isGray={true} />
        </div>
        <div className={styles.search_container}>
          <div>
            <Image src={ICONS.SEARCH} width={12} height={12} />
          </div>
          <input
            value={search}
            disabled
            className={`${styles.input} ${styles.input_focused}`}
          />
        </div>
      </section>
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

Result.header = undefined;
export default Result;
