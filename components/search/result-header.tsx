import React, { memo } from "react";
import BackIcon from "components/icons/back";
import { ICONS } from "lib/assets";
import Image from "next/image";
import styles from "styles/search/search-header.module.css";
import { useRouter } from "next/router";

const Header = ({ search }: { search: string }) => {
  const router = useRouter();
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
    </>
  );
};

export default memo(Header);
