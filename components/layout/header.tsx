import { IMAGES } from "lib/assets";
import Image from "next/image";
import { memo } from "react";
import styles from "styles/layout.module.css";
import { LayoutHeader } from "types/common";

const Header = ({ title }: LayoutHeader) => {
  return (
    <header className={styles.header}>
      {title ? (
        <h2>{title}</h2>
      ) : (
        <Image src={IMAGES.ICON_SM} width={80} height={22} />
      )}
    </header>
  );
};

export default memo(Header);
