import { useRouter } from "next/router";
import Image from "next/image";
import styles from "styles/search/result.module.css";
import { ICONS } from "lib/assets";
import Thumbnail from "components/search/thumbnail";
import SelectBox from "components/custom/select-box";

const Result = () => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <>
      <section className={styles.header}>
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
      <div className={styles.select_container}>
        <SelectBox />
      </div>
      <div>
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
    </>
  );
};

Result.header = "undefined";

export default Result;
