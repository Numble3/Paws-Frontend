import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import styles from "styles/search/result.module.css";
import { ICONS } from "lib/assets";
import Thumbnail from "components/search/thumbnail";
import SelectBox from "components/custom/select-box";
import NoResult from "components/search/noResult";
import { NextPageWithLayout } from "types/common";

const Result: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router.query;
  const [data, setData] = useState({
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 10,
    view: 380,
  });
  return (
    <>
      <section className={styles.header}>
        {/* back 아이콘 추후 교체 */}
        <div className={styles.back}>
          <Image src={ICONS.BACK} width={12} height={12} />
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
      {data ? (
        <section>
          <div className={styles.select_container}>
            <SelectBox />
          </div>
          <ul className={styles.thumbnail_row}>
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
          </ul>
        </section>
      ) : (
        <NoResult />
      )}
    </>
  );
};

Result.header = undefined;
export default Result;
