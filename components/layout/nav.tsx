import {
  CategoryIcon,
  HomeIcon,
  LikeIcon,
  ProfileIcon,
} from "components/icons";
import { ICONS } from "lib/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import styles from "styles/layout.module.css";

const Nav = () => {
  const router = useRouter();

  const navItems = useMemo(
    () => [
      {
        path: "/",
        icon: <HomeIcon isActive={router.asPath === "/"} />,
      },
      {
        path: "/search",
        icon: <CategoryIcon isActive={router.asPath === "/search"} />,
      },
      {
        path: "/upload",
        icon: <Image width={20} height={20} src={ICONS.UPLOAD} />,
        hasCircle: true,
      },
      {
        path: "/interestVideo",
        icon: <LikeIcon isActive={router.asPath === "/interestVideo"} />,
      },
      {
        path: "/profile",
        icon: <ProfileIcon isActive={router.asPath === "/profile"} />,
      },
    ],
    [router]
  );

  return (
    <nav className={styles.nav}>
      <ul>
        {navItems.map((v, i) => (
          <Link href={v.path} key={i}>
            <li
              className={`${v.hasCircle ? styles.upload : ""} ${
                router.asPath === v.path ? styles.highlight : ""
              }`}
            >
              {v.icon}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default memo(Nav);
