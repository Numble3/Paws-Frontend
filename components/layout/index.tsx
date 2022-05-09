import { ReactNode } from "react";
import Header from "./header";
import Nav from "./nav";
import styles from "styles/layout.module.css";
import { LayoutHeader } from "types/common";

export default function LayoutContiner({
  children,
  layoutHeader,
  noNav,
}: {
  children: ReactNode;
  layoutHeader?: LayoutHeader;
  noNav?: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      {layoutHeader && <Header {...layoutHeader} />}
      <main className={styles.main}>{children}</main>
      {!noNav && <Nav />}
    </div>
  );
}
