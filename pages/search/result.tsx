import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import styles from "styles/search/result.module.css";
import { ICONS } from "lib/assets";
import SelectBox from "components/custom/select-box";
import NoResult from "components/custom/no-result";
import { VideoList } from "components/custom";
import { NextPageWithLayout } from "types/common";
import BackIcon from "components/icons/back";

const noSearchResult = {
  title: "검색 결과 없음",
  content:
    "해당 키워드와 관련된 검색결과가 없어요.\n다른 검색어로 다시 시도해보세요!",
};
const Result: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const router = useRouter();
  const { query } = router.query;

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
            value={query}
            disabled
            className={`${styles.input} ${styles.input_focused}`}
          />
        </div>
      </section>
      {true ? (
        <>
          <div className={styles.select_container}>
            <SelectBox setSelectedCategory={setSelectedCategory} />
          </div>
          <section className={styles.thumbnail_container}>
            <ul className={styles.thumbnail_row}>
              <VideoList datas={[]} />
            </ul>
          </section>
        </>
      ) : (
        <NoResult {...noSearchResult} />
      )}
    </>
  );
};

Result.header = undefined;
export default Result;
