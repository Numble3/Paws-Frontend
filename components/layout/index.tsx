import { ReactNode } from "react";
import Header from "./header";
import Nav from "./nav";
import styles from "styles/layout.module.css";
import { LayoutHeader } from "types/common";

export default function LayoutContainer({
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
      <main
        style={{
          paddingTop: layoutHeader && "56px",
          paddingBottom: !noNav ? "56px" : "0",
          overflow: "auto",
          height: "100%",
        }}
      >
        {children}
      </main>
      {!noNav && <Nav />}
    </div>
  );
}
