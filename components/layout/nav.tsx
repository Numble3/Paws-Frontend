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
import { memo, useMemo, useState } from "react";
import styles from "styles/layout.module.css";
import NavPopUp from "components/custom/nav-popup";
import { useCheck } from "hooks/use-check";

const Nav = () => {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const { checkModal } = useCheck();

  const navItems = useMemo(
    () => [
      {
        path: "/",
        isActive: router.pathname === "/",
        icon: <HomeIcon isActive={router.pathname === "/"} />,
      },
      {
        path: "/search",
        isActive: router.pathname === "/search",
        icon: <CategoryIcon isActive={router.pathname === "/search"} />,
      },
      {
        path: "/upload",
        icon: <Image width={20} height={20} src={ICONS.UPLOAD} />,
        hasCircle: true,
      },
      {
        path: "/interestVideo",
        isActive: router.pathname === "/interestVideo",
        icon: <LikeIcon isActive={router.pathname === "/interestVideo"} />,
      },
      {
        path: "/profile",
        isActive: /profile/.test(router.pathname),
        icon: <ProfileIcon isActive={/profile/.test(router.pathname)} />,
      },
    ],
    [router]
  );

  const handlePopupClicked = () => {
    const isUser = checkModal(false);
    if (isUser) {
      setVisible(true);
    }
  };

  return (
    <nav className={styles.nav}>
      {visible && (
        <NavPopUp
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
      <ul>
        {navItems.map((v, i) => {
          if (i === 2) {
            return (
              <li
                key={i}
                onClick={handlePopupClicked}
                className={styles.upload}
              >
                {v.icon}
              </li>
            );
          } else {
            return (
              <Link href={v.path} key={i}>
                <li
                  className={`${v.hasCircle ? styles.upload : ""} ${
                    v.isActive ? styles.highlight : ""
                  }`}
                >
                  {v.icon}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default memo(Nav);
