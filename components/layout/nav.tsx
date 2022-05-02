import { ICONS } from "lib/assets";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import styles from "styles/layout.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
            <Image src={ICONS.HOME} width={20} height={20} />
          </Link>
        </li>
        <li>
          <Link href="/myVideo">
            <Image src={ICONS.CATEGORY} width={20} height={20} />
          </Link>
        </li>
        <li className={styles.upload}>
          <Link href="/upload">
            <Image src={ICONS.UPLOAD} width={20} height={20} />
          </Link>
        </li>
        <li>
          <Link href="/interestVideo">
            <Image src={ICONS.LIKE} width={20} height={20} />
          </Link>
        </li>

        <li>
          <Link href="/profile">
            <Image src={ICONS.PROFILE} width={20} height={20} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Nav);
