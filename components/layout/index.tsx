import { ReactNode } from "react";
import { Layout } from "types/common";
import Header from "./header";
import Tab from "./tab";
import styles from "styles/layout.module.css";

export default function LayoutContiner({
  children,
  noHeader,
  noNav,
}: {
  children: ReactNode;
  noHeader?: boolean;
  noNav?: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      {noHeader && <Header />}
      {children}
      {noNav && <Tab />}
    </div>
  );
}
