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
import { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "styles/layout.module.css";
import NavPopUp from "components/custom/nav-popup";
import { useCheck } from "hooks/use-check";

const Nav = () => {
  const [visible, setVisible] = useState(false);
  const li = useRef<HTMLLIElement>(null);

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
        isActive: /search/.test(router.pathname),
        icon: <CategoryIcon isActive={/search/.test(router.pathname)} />,
      },
      {
        path: "/upload",
        icon: <Image width={20} height={20} src={ICONS.UPLOAD} />,
        hasCircle: true,
      },
      {
        path: "/interestVideo",
        isActive: /interestVideo/.test(router.pathname),
        icon: <LikeIcon isActive={/interestVideo/.test(router.pathname)} />,
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
  const handleCloseModal = (e: any) => {
    if (li.current && !li.current.contains(e.target)) {
      setVisible(false);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);
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
                ref={li}
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
